import React from "react";
import styled, { css } from "styled-components";
import * as DropdownComponent from "../components/Dropdown";
import * as Toast from "../components/Toast";
import * as Tooltip from "../components/Tooltip";
import * as Form from "../components/Form";
import { hasCommandModifier } from "../keyboard";
import { formatTitle } from "../string";
import { ChevronDownIcon } from "@radix-ui/react-icons";

// @ts-ignore
import LogoSVG from "../../assets/images/ko-black.svg?component";
import Color from "color";

const StyledRoot = styled.header`
  position: sticky;
  display: flex;
  top: 0;
  width: 100%;
  height: ${({ theme }) => theme.tabHeight}px;
  flex-shrink: 0;
  z-index: 100;
  gap: 0.5rem;
  font-size: 13px;
  color: #222;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(2px);
  flex-shrink: 0;
  transition: box-shadow 0.5s ease;

  .ko-player[data-scrolled="true"] & {
    box-shadow: 0 2px 2px rgba(0, 0, 0, 0.05), 0 -2px 2px rgba(0, 0, 0, 0.05);
  }

  // @media only screen and ${({ theme }) => theme.breakpoints.m} {
  //   position: relative;
  //   z-index: auto;

  //   .ko-player[data-scrolled='true'] & {
  //     box-shadow: none;
  //   }
  // }
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-right: auto;
  color: #222;
  font-weight: bold;
  width: 26px;
  height: 26px;

  svg {
    width: 100%;
    height: 100%;
  }
`;

export const Button = styled.button`
  display: flex;
  padding: 0 1rem;
  margin: 0;
  height: ${({ theme }) => theme.tabHeight}px;
  align-items: center;
  outline: 0;
  -webkit-tap-highlight-color: transparent;

  &:hover,
  &[data-state="open"] {
    background: ${({ theme }) => theme.colors.brand};
  }

  &:active {
    background: ${({ theme }) => Color(theme.colors.brand)!.darken(0.2).hexa()};
  }
`;

const StyledUploadButton = styled(DropdownComponent.Item)`
  position: relative;
  cursor: pointer;
  outline: 0;
`;

export const IconButton = styled(Button)`
  svg {
    width: 16px;
    height: 16px;
  }
`;

export const RightSlot = styled.div`
  margin-left: auto;
  display: flex;
`;

/**
 * Builds the file contents for an HTML export.
 */
function getHTMLFileContents({ title, json }: { title: string; json: string }) {
  // Needs to be encoded since user content (<script> tags) may end up
  // breaking the HTML rendering.
  json = encodeURIComponent(json);

  return `<!DOCTYPE html>
<html>
  <head>
    <title>${title}</title>
    <!-- The Kodemo player is also available via npm: https://kodemo.com/docs/player -->
    <script src="https://unpkg.com/@kodemo/player-standalone/dist/kodemo-player.umd.js"></script>
  </head>
  <body>
    <script>
      // The KodemoPlayer constructor accepts width/height props for size control
      const player = new KodemoPlayer();

      // Load our document JSON
      player.load(JSON.parse(decodeURIComponent("${json}")));
    </script>
  </body>
</html>`;
}

function saveToFile(json: any, filename = "kodemo.json") {
  const file = new File([json], filename);

  // Create a link and set the URL using `createObjectURL`
  const link = document.createElement("a");
  link.style.display = "none";
  link.href = URL.createObjectURL(file);
  link.download = file.name;
  // It needs to be added to the DOM so it can be clicked
  document.body.appendChild(link);
  link.click();

  // To make this work on Firefox we need to wait
  // a little while before removing it.
  setTimeout(() => {
    URL.revokeObjectURL(link.href);
    if (link.parentNode) {
      link.parentNode.removeChild(link);
    }
  }, 0);
}

function getFilenameForDocument(doc: any) {
  return doc.title?.toLowerCase().replace(/\s/g, "-") || "kodemo";
}

interface KodemoMenuContextProps {
  saveFileAsJSON: () => void;
  saveFileAsHTML: () => void;
  loadFileAsJSON: (file: File) => void;
  onKeyboardSaveShortcut: () => void;
}

interface KodemoMenuProps {
  children: React.ReactNode;
  onKeyboardSaveShortcut: () => void;
  getDocumentJSON: () => any;
  setDocumentJSON: (json: any) => void;
}

const KodemoMenuContext = React.createContext<KodemoMenuContextProps>({
  saveFileAsHTML: () => {},
  saveFileAsJSON: () => {},
  loadFileAsJSON: () => {},
  onKeyboardSaveShortcut: () => {},
});

export const KodemoMenuProvider = ({
  children,
  onKeyboardSaveShortcut,
  ...props
}: KodemoMenuProps) => {
  const [saveErrorOpen, setSaveErrorOpen] = React.useState(false);
  const [loadErrorOpen, setLoadErrorOpen] = React.useState(false);

  const saveFileAsJSON = React.useCallback(() => {
    const json = props.getDocumentJSON();
    let filename = getFilenameForDocument(json) + ".json";
    let fileContents;

    try {
      fileContents = JSON.stringify(json);
    } catch (error) {
      console.warn("Unable to save as JSON.", error);
      setSaveErrorOpen(true);
    }

    if (fileContents) {
      saveToFile(fileContents, filename);
    } else {
      setSaveErrorOpen(true);
    }
  }, []);

  const saveFileAsHTML = React.useCallback(() => {
    const json = props.getDocumentJSON();
    let filename = getFilenameForDocument(json) + ".html";
    let fileContents;

    try {
      fileContents = getHTMLFileContents({
        title: json.title,
        json: JSON.stringify(json),
      });
    } catch (error) {
      console.warn("Unable to save as HTML.", error);
      setSaveErrorOpen(true);
    }

    if (fileContents) {
      saveToFile(fileContents, filename);
    } else {
      setSaveErrorOpen(true);
    }
  }, []);

  const loadFileAsJSON = React.useCallback((file: File) => {
    file.text().then((fileContents: string) => {
      let json;

      try {
        json = JSON.parse(fileContents);
      } catch (error) {
        console.warn("Unable to load malformed JSON.", error);
        setLoadErrorOpen(true);
      }

      if (json) {
        props.setDocumentJSON(json);
      }
    });
  }, []);

  return (
    <KodemoMenuContext.Provider
      value={React.useMemo(
        () => ({
          saveFileAsJSON,
          saveFileAsHTML,
          loadFileAsJSON,
          onKeyboardSaveShortcut,
        }),
        []
      )}
    >
      {children}
      <Toast.Warning
        title="Failed to save file"
        description="Please try again."
        open={saveErrorOpen}
        onOpenChange={setSaveErrorOpen}
      ></Toast.Warning>
      <Toast.Warning
        title="Unable to parse JSON"
        description="File does not appear to be a valid Kodemo JSON document."
        open={loadErrorOpen}
        onOpenChange={setLoadErrorOpen}
      ></Toast.Warning>
    </KodemoMenuContext.Provider>
  );
};

export function useKodemoMenu() {
  return React.useContext(KodemoMenuContext);
}

export const SaveJSONButton = (props: any) => {
  const { saveFileAsJSON } = useKodemoMenu();

  return (
    <DropdownComponent.Item
      onSelect={saveFileAsJSON}
      {...props}
    ></DropdownComponent.Item>
  );
};

export const SaveHTMLButton = (props: any) => {
  const { saveFileAsHTML } = useKodemoMenu();

  return (
    <DropdownComponent.Item
      onSelect={saveFileAsHTML}
      {...props}
    ></DropdownComponent.Item>
  );
};

export const LoadJSONButton = ({ children, ...props }: any) => {
  const { loadFileAsJSON } = useKodemoMenu();
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  let closeable = false;

  const handleChange = () => {
    if (inputRef.current && buttonRef.current) {
      const files = inputRef.current.files;
      if (files && files.length > 0) {
        loadFileAsJSON(files[0]);
      }

      closeable = true;
      buttonRef.current.click();
    }
  };

  const handleSelect = (event: Event) => {
    if (closeable === false) {
      event.preventDefault();
    }
  };

  return (
    <div>
      <StyledUploadButton
        ref={buttonRef}
        {...props}
        asChild
        onSelect={handleSelect}
      >
        <label htmlFor="upload-json-document">{children}</label>
      </StyledUploadButton>
      <input
        id="upload-json-document"
        ref={inputRef}
        type="file"
        accept="application/json"
        style={{ display: "none" }}
        onChange={handleChange}
      />
    </div>
  );
};

export function Root({
  children,
  onKeyboardSaveShortcut,
  ...props
}: KodemoMenuProps) {
  return (
    <Tooltip.Provider>
      <Toast.Provider>
        <KodemoMenuProvider
          getDocumentJSON={props.getDocumentJSON}
          setDocumentJSON={props.setDocumentJSON}
          onKeyboardSaveShortcut={onKeyboardSaveShortcut}
        >
          <StyledRoot {...props} className="ko-menu">
            {children}
          </StyledRoot>
          <Toast.Viewport />
        </KodemoMenuProvider>
      </Toast.Provider>
    </Tooltip.Provider>
  );
}

export function Logo({ href }: { href: string }) {
  if (href) {
    return (
      <Button as="a" href={href}>
        <LogoWrapper>
          <LogoSVG></LogoSVG>
        </LogoWrapper>
      </Button>
    );
  } else {
    return (
      <Button style={{ pointerEvents: "none" }}>
        <LogoWrapper>
          <LogoSVG></LogoSVG>
        </LogoWrapper>
      </Button>
    );
  }
}

function DropdownTrigger() {
  return (
    <>
      <LogoWrapper>
        <LogoSVG></LogoSVG>
      </LogoWrapper>
      <ChevronDownIcon style={{ marginLeft: 5 }}></ChevronDownIcon>
    </>
  );
}

export function Dropdown({
  trigger,
  children,
}: {
  trigger: React.ReactNode;
  children: React.ReactNode;
}) {
  const { saveFileAsJSON, onKeyboardSaveShortcut } = useKodemoMenu();

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "s" && hasCommandModifier(event)) {
        event.preventDefault();
        if (onKeyboardSaveShortcut) {
          onKeyboardSaveShortcut();
        } else {
          saveFileAsJSON();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <DropdownComponent.Root>
      <DropdownComponent.Trigger asChild>
        <Button className="ko-menu-trigger">
          {trigger || <DropdownTrigger />}
        </Button>
      </DropdownComponent.Trigger>
      <DropdownComponent.Content
        sideOffset={-7}
        alignOffset={20}
        className="ko-menu-content"
      >
        {children}
        <DropdownComponent.Arrow offset={17} />
      </DropdownComponent.Content>
    </DropdownComponent.Root>
  );
}

/**
 * Document title
 */

const StyledTitle = styled.div<any>`
  display: block;
  align-items: center;
  text-align: center;
  line-height: ${({ theme }) => theme.tabHeight}px;
  color: rgba(0, 0, 0, 0.3);
  flex-grow: 2;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 0 auto;

  &:hover {
    color: #000;
  }

  ${(props) =>
    !props.editable &&
    css`
      pointer-events: none;
    `}
`;

const StyledTitleInput = styled(Form.TextInput)<any>`
  outline: 0;
  padding: 0;
  border: 0;
  line-height: 1.4;
  box-shadow: none !important;
  text-align: center;
  background: transparent;
  max-width: 200px;
`;

interface KodemoTitleProps {
  defaultTitle: string;
  editable: boolean;
  onTitleChange: (title: string) => void;
}

export function Title({
  defaultTitle,
  onTitleChange,
  editable = false,
}: KodemoTitleProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [editing, setEditing] = React.useState(false);
  const [title, setTitle] = React.useState<string>();

  const startEditing = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();
    setEditing(true);
  };

  const stopEditing = () => {
    setEditing(false);

    if (inputRef.current) {
      let value = formatTitle(inputRef.current.value);

      // We never want to save an empty title
      if (!value || value === "") {
        value = defaultTitle;
      }

      setTitle(value);
      onTitleChange(value);
    }
  };

  React.useEffect(() => {
    if (editing && inputRef.current && typeof title !== "undefined") {
      inputRef.current.value = title;
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editing]);

  React.useEffect(() => {
    // Stay in sync with the default title
    if (title !== defaultTitle) {
      // Ensure that the title is never empty
      const newTitle = formatTitle(defaultTitle) || "Untitled";
      setTitle(newTitle);

      // If we're currently editing, update the input value
      if (inputRef.current) {
        inputRef.current.value = newTitle;
      }
    }
  }, [defaultTitle]);

  if (editing) {
    return (
      <StyledTitle className="ko-document-title">
        <StyledTitleInput
          type="text"
          ref={inputRef}
          onBlur={stopEditing}
          onConfirm={stopEditing}
        />
      </StyledTitle>
    );
  } else {
    return (
      <>
        <StyledTitle
          editable={editable}
          className="ko-document-title"
          onMouseDown={startEditing}
        >
          {title}
        </StyledTitle>
      </>
    );
  }
}
