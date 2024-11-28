import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/toastui-editor.css';

const toolbar = [
  ['heading', 'bold', 'italic', 'strike'],
  ['hr', 'quote', 'ul', 'ol'],
  ['image'],
];

const ToastEditor = ({
  initialValue,
  editorRef,
  handleImage,
  height,
  onChange,
}) => {
  return (
    <Editor
      placeholder="내용을 입력해주세요."
      initialValue={initialValue ?? ''}
      initialEditType="wysiwyg"
      autofocus={false}
      ref={editorRef}
      toolbarItems={toolbar}
      hideModeSwitch={true}
      height={height}
      viewer={true}
      onChange={onChange}
      language="ko-KR"
      useCommandShortcut={false}
      hooks={{ addImageBlobHook: handleImage }}
    />
  );
};

export default ToastEditor;
