import "./demo.css";
import React from "react";
import ReactDOM from "react-dom/client";
import {
  Dropdown,
  Button,
  SlateButton,
  ActiveButton,
  SilverButton,
  DarkButton,
  IconButton,
  theme,
  Popover,
  Toast,
  Tooltip,
  Dialog,
  Slider,
  Form,
  useNotifications,
  NotificationsProvider,
} from "./src";
import styled, { ThemeProvider } from "styled-components";
import {
  CheckIcon,
  ClipboardCopyIcon,
  Cross2Icon,
  PlusIcon,
  TrashIcon,
  UploadIcon,
} from "@radix-ui/react-icons";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
          padding: "1rem 2rem",
        }}
      >
        <div>
          <h2>Button</h2>
          <div style={{ display: "flex", gap: 10 }}>
            <Button>Button</Button>
            <SilverButton>
              SilverButton <TrashIcon className="icon"></TrashIcon>
            </SilverButton>
            <SilverButton data-rounding="l">SilverButton</SilverButton>
            <SlateButton>SlateButton</SlateButton>
            <DarkButton>DarkButton</DarkButton>
            <IconButton>
              <PlusIcon></PlusIcon>
            </IconButton>
          </div>
        </div>

        <div>
          <h2>Dropdown</h2>
          <div style={{ display: "flex", gap: 10 }}>
            <DropdownExample>
              <Button>Dropdown</Button>
            </DropdownExample>
          </div>
        </div>

        <div>
          <h2>Popover</h2>
          <div style={{ display: "flex", gap: 10 }}>
            <PopoverExample>
              <Button>Confirmation</Button>
            </PopoverExample>
          </div>
        </div>

        <div>
          <h2>Dialog</h2>
          <div style={{ display: "flex", gap: 10 }}>
            <DialogConfirmation>
              <Button>Confirmation</Button>
            </DialogConfirmation>
            <DialogTextInput>
              <Button>Input</Button>
            </DialogTextInput>
          </div>
        </div>

        <div>
          <h2>Toast</h2>
          <div style={{ display: "flex", gap: 10 }}>
            <ToastExample></ToastExample>
          </div>
        </div>

        <div>
          <h2>Tooltip</h2>
          <div style={{ display: "flex", gap: 10, overflow: "hidden" }}>
            <Tooltip.Provider>
              <Tooltip.Tip text="This is a tooltip">
                <Button>Tooltip</Button>
              </Tooltip.Tip>
              <Tooltip.Tip
                text="This is a tooltip a very, very long tooltip."
                side="bottom"
              >
                <Button>Long tooltip</Button>
              </Tooltip.Tip>
            </Tooltip.Provider>
          </div>
        </div>

        <div>
          <h2>Slider</h2>
          <div style={{ display: "flex", gap: 10 }}>
            <div style={{ padding: 10 }}>
              <Slider.Default defaultValue={[50]} step={1} />
            </div>
            <div style={{ backgroundColor: "#222", padding: 10 }}>
              <Slider.Default defaultValue={[50]} step={1} variant="dark" />
            </div>
          </div>
        </div>

        <div>
          <h2>Form</h2>
          <div style={{ display: "flex", gap: 10 }}>
            <FormExample></FormExample>
          </div>
        </div>
      </div>
    </ThemeProvider>
  </React.StrictMode>
);

function DropdownExample({ children, ...props }) {
  return (
    <Dropdown.Root>
      <Dropdown.Trigger asChild {...props}>
        {children}
      </Dropdown.Trigger>

      <Dropdown.Content>
        <Dropdown.Group>
          <Dropdown.Item>
            Upload{" "}
            <Dropdown.RightSlot>
              <UploadIcon />
            </Dropdown.RightSlot>
          </Dropdown.Item>
        </Dropdown.Group>
        <Dropdown.Separator />
        <Dropdown.Label>Create file</Dropdown.Label>
        <Dropdown.Group>
          <Dropdown.Item>
            One
            <Dropdown.RightSlot className="faded">#1</Dropdown.RightSlot>
          </Dropdown.Item>
          <Dropdown.Item>
            Two
            <Dropdown.RightSlot className="faded">#2</Dropdown.RightSlot>
          </Dropdown.Item>
          <Dropdown.Item>
            Three
            <Dropdown.RightSlot className="faded">#3</Dropdown.RightSlot>
          </Dropdown.Item>
        </Dropdown.Group>
        <Dropdown.Group>
          <Dropdown.Item>
            Upload{" "}
            <Dropdown.RightSlot>
              <UploadIcon />
            </Dropdown.RightSlot>
          </Dropdown.Item>
        </Dropdown.Group>
        <Dropdown.Separator />
        <Dropdown.Label>Create file</Dropdown.Label>
        <Dropdown.Group>
          <Dropdown.Item>
            One
            <Dropdown.RightSlot className="faded">#1</Dropdown.RightSlot>
          </Dropdown.Item>
          <Dropdown.Item>
            Two
            <Dropdown.RightSlot className="faded">#2</Dropdown.RightSlot>
          </Dropdown.Item>
          <Dropdown.Item>
            Three
            <Dropdown.RightSlot className="faded">#3</Dropdown.RightSlot>
          </Dropdown.Item>
        </Dropdown.Group>
        <Dropdown.Group>
          <Dropdown.Item>
            Upload{" "}
            <Dropdown.RightSlot>
              <UploadIcon />
            </Dropdown.RightSlot>
          </Dropdown.Item>
        </Dropdown.Group>
        <Dropdown.Separator />
        <Dropdown.Label>Create file</Dropdown.Label>
        <Dropdown.Group>
          <Dropdown.Item>
            One
            <Dropdown.RightSlot className="faded">#1</Dropdown.RightSlot>
          </Dropdown.Item>
          <Dropdown.Item>
            Two
            <Dropdown.RightSlot className="faded">#2</Dropdown.RightSlot>
          </Dropdown.Item>
          <Dropdown.Item>
            Three
            <Dropdown.RightSlot className="faded">#3</Dropdown.RightSlot>
          </Dropdown.Item>
        </Dropdown.Group>
        <Dropdown.Group>
          <Dropdown.Item>
            Upload{" "}
            <Dropdown.RightSlot>
              <UploadIcon />
            </Dropdown.RightSlot>
          </Dropdown.Item>
        </Dropdown.Group>
        <Dropdown.Separator />
        <Dropdown.Label>Create file</Dropdown.Label>
        <Dropdown.Group>
          <Dropdown.Item>
            One
            <Dropdown.RightSlot className="faded">#1</Dropdown.RightSlot>
          </Dropdown.Item>
          <Dropdown.Item>
            Two
            <Dropdown.RightSlot className="faded">#2</Dropdown.RightSlot>
          </Dropdown.Item>
          <Dropdown.Item>
            Three
            <Dropdown.RightSlot className="faded">#3</Dropdown.RightSlot>
          </Dropdown.Item>
        </Dropdown.Group>
        <Dropdown.Group>
          <Dropdown.Item>
            Upload{" "}
            <Dropdown.RightSlot>
              <UploadIcon />
            </Dropdown.RightSlot>
          </Dropdown.Item>
        </Dropdown.Group>
        <Dropdown.Separator />
        <Dropdown.Label>Create file</Dropdown.Label>
        <Dropdown.Group>
          <Dropdown.Item>
            Upload{" "}
            <Dropdown.RightSlot>
              <UploadIcon />
            </Dropdown.RightSlot>
          </Dropdown.Item>
        </Dropdown.Group>
        <Dropdown.Separator />
        <Dropdown.Label>Create file</Dropdown.Label>
        <Dropdown.Group>
          <Dropdown.Item>
            One
            <Dropdown.RightSlot className="faded">#1</Dropdown.RightSlot>
          </Dropdown.Item>
          <Dropdown.Item>
            Two
            <Dropdown.RightSlot className="faded">#2</Dropdown.RightSlot>
          </Dropdown.Item>
          <Dropdown.Item>
            Three
            <Dropdown.RightSlot className="faded">#3</Dropdown.RightSlot>
          </Dropdown.Item>
        </Dropdown.Group>
        <Dropdown.Group>
          <Dropdown.Item>
            One
            <Dropdown.RightSlot className="faded">#1</Dropdown.RightSlot>
          </Dropdown.Item>
          <Dropdown.Item>
            Two
            <Dropdown.RightSlot className="faded">#2</Dropdown.RightSlot>
          </Dropdown.Item>
          <Dropdown.Item>
            Three
            <Dropdown.RightSlot className="faded">#3</Dropdown.RightSlot>
          </Dropdown.Item>
        </Dropdown.Group>
        <Dropdown.Group>
          <Dropdown.Item>
            Upload{" "}
            <Dropdown.RightSlot>
              <UploadIcon />
            </Dropdown.RightSlot>
          </Dropdown.Item>
        </Dropdown.Group>
        <Dropdown.Separator />
        <Dropdown.Label>Create file</Dropdown.Label>
        <Dropdown.Group>
          <Dropdown.Item>
            One
            <Dropdown.RightSlot className="faded">#1</Dropdown.RightSlot>
          </Dropdown.Item>
          <Dropdown.Item>
            Two
            <Dropdown.RightSlot className="faded">#2</Dropdown.RightSlot>
          </Dropdown.Item>
          <Dropdown.Item>
            Three
            <Dropdown.RightSlot className="faded">#3</Dropdown.RightSlot>
          </Dropdown.Item>
        </Dropdown.Group>
        <Dropdown.Arrow />
      </Dropdown.Content>
    </Dropdown.Root>
  );
}

function PopoverExample({ children, ...props }) {
  return (
    <Popover.Confirmation
      title="Are you sure?"
      onConfirm={() => {
        console.log("confirmed!");
      }}
    >
      {children}
    </Popover.Confirmation>
  );
}

function ToastExample() {
  const [infoOpen, setInfoOpen] = React.useState(false);
  const [warningOpen, setWarningOpen] = React.useState(false);

  return (
    <Toast.Provider>
      <NotificationsProvider>
        <Button onClick={() => setInfoOpen(true)}>Info</Button>
        <Button onClick={() => setWarningOpen(true)}>Warning</Button>
        <ToastNotifications />

        <Toast.Info
          title="This is an info toast"
          description="Here's the description"
          open={infoOpen}
          onOpenChange={setInfoOpen}
        ></Toast.Info>

        <Toast.Warning
          title="This is a warning toast"
          description="Here's the description"
          open={warningOpen}
          onOpenChange={setWarningOpen}
        ></Toast.Warning>
      </NotificationsProvider>
      <Toast.Viewport />
    </Toast.Provider>
  );
}

function ToastNotifications() {
  const { showNotification, hideNotification } = useNotifications();

  return (
    <>
      <Button
        onClick={() =>
          showNotification({ id: "note", title: "Test notification" })
        }
      >
        Show notification
      </Button>
      <Button
        onClick={() =>
          showNotification({
            id: "note-icon",
            title: "Test",
            icon: <CheckIcon />,
          })
        }
      >
        Show notification with icon
      </Button>
      <Button onClick={() => hideNotification("note")}>
        Hide notification
      </Button>
    </>
  );
}

function DialogConfirmation({ children }) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Inner>
        <Dialog.Title>Editor Alpha</Dialog.Title>
        <Dialog.Text>
          Thanks for trying out the alpha release of Kodemo!
        </Dialog.Text>
        <Dialog.Text>
          Please refrain from creating any content that you want to keep right
          now. Your data is only persisted locally in the browser unless you
          file -&gt; save JSON.
        </Dialog.Text>
        <Dialog.Text>
          I would love your feedback about what makes sense and what doesn't.
          Feel free to email me or share at{" "}
          <a href="https://github.com/KodemoApp/feedback">
            github.com/kodemoapp/feedback
          </a>
        </Dialog.Text>
        <Dialog.Text>-Hakim 🙌</Dialog.Text>
        <Dialog.Footer>
          <Dialog.Close>
            <ActiveButton>Okay, let's go!</ActiveButton>
          </Dialog.Close>
        </Dialog.Footer>
        <Dialog.Cross></Dialog.Cross>
      </Dialog.Inner>
    </Dialog.Root>
  );
}

function DialogTextInput({ children }) {
  const ref = React.useRef(null);
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Inner>
        {/* <Dialog.Busy>Saving</Dialog.Busy> */}
        <Dialog.Title>Iframe URL</Dialog.Title>
        <Dialog.Text style={{ width: "100%", gap: 10 }}>
          <Form.Label htmlFor="payload" style={{ flexShrink: 0 }}>
            Please enter a valid website address.
          </Form.Label>
          <Form.TextInput
            ref={ref}
            id="payload"
            placeholder="Placeholder text"
            formatter={Form.TextInputTypes.url.format}
          />
        </Dialog.Text>
        <Dialog.Text style={{ width: "100%", gap: 10 }}>
          <Form.Label htmlFor="payload" style={{ flexShrink: 0 }}>
            Readonly and copyable
          </Form.Label>
          <Form.TextInput
            ref={ref}
            value="https://kodemo.com"
            readOnly={true}
            selectOnFocus={true}
            copyToClipboard={true}
          />
        </Dialog.Text>
        <Dialog.Footer>
          <Dialog.Close>
            <SilverButton>Cancel</SilverButton>
          </Dialog.Close>
          <Dialog.Close>
            <ActiveButton>Save</ActiveButton>
          </Dialog.Close>
        </Dialog.Footer>
        <Dialog.Cross></Dialog.Cross>
      </Dialog.Inner>
    </Dialog.Root>
  );
}

const RowFieldset = styled.fieldset`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  gap: 10px;
  border: 0;
  padding: 0;
`;

const ColumnFieldset = styled.fieldset`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  gap: 10px;
  border: 0;
  padding: 0;
`;

function FormExample() {
  const ref1 = React.useRef();
  const ref2 = React.useRef();
  const ref3 = React.useRef();
  const ref4 = React.useRef();
  const ref5 = React.useRef();
  const ref6 = React.useRef();
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        maxWidth: 500,
        gap: 20,
      }}
    >
      <ColumnFieldset>
        <Form.Label htmlFor="payload" style={{ flexShrink: 0 }}>
          Input
        </Form.Label>
        <Form.TextInput
          ref={ref4}
          id="payload"
          placeholder="Placeholder text"
        />
      </ColumnFieldset>
      <ColumnFieldset>
        <Form.Label htmlFor="payload" style={{ flexShrink: 0 }}>
          Input + clear button (col)
        </Form.Label>
        <Form.TextInputWithClearButton
          ref={ref3}
          id="payload"
          placeholder="Placeholder text"
        />
      </ColumnFieldset>
      <RowFieldset>
        <Form.Label htmlFor="payload" style={{ flexShrink: 0 }}>
          Input + clear button (row)
        </Form.Label>
        <Form.TextInputWithClearButton
          ref={ref1}
          id="payload"
          placeholder="Placeholder text"
        />
      </RowFieldset>
      <RowFieldset>
        <Form.Label htmlFor="payload" style={{ flexShrink: 0 }}>
          Input + clear button + seamless (row)
        </Form.Label>
        <Form.TextInputWithClearButton
          ref={ref2}
          id="payload"
          placeholder="Placeholder text"
          seamless={true}
          smooth={true}
        />
      </RowFieldset>
      <RowFieldset>
        <Form.Label htmlFor="payload" style={{ flexShrink: 0 }}>
          Readonly input with copy button
        </Form.Label>
        <Form.TextInput
          value="https://kodemo.com"
          readOnly={true}
          selectOnFocus={true}
          copyToClipboard={true}
        />
      </RowFieldset>
      <ColumnFieldset
        style={{ backgroundColor: "#222", padding: 10, color: "#fff" }}
      >
        <Form.Label htmlFor="payload" style={{ flexShrink: 0 }}>
          Dark background
        </Form.Label>
        <Form.TextInput
          ref={ref5}
          id="payload"
          variant="dark"
          placeholder="Placeholder text"
        />
        <Form.TextInputWithClearButton
          ref={ref6}
          id="payload"
          placeholder="Placeholder text"
          variant="dark"
          seamless={true}
          smooth={true}
        />
      </ColumnFieldset>
    </div>
  );
}
