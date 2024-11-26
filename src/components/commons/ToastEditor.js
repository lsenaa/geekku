import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/toastui-editor.css';

const toolbar = [
  ['heading', 'bold', 'italic', 'strike'],
  ['hr', 'quote', 'ul', 'ol'],
  ['image'],
];

const ToastEditor = ({ editorRef, imageHandler, onChange }) => {
  return (
    <Editor
      placeholder="내용을 입력해주세요."
      autofocus={false}
      ref={editorRef}
      toolbarItems={toolbar}
      hideModeSwitch
      height="500px"
      viewer={true}
      useCommandShortcut={false}
      hooks={{ addImageBlobHook: imageHandler }}
      onChange={onChange}
    />
  );
};

export default ToastEditor;
