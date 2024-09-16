"use client";
import "@mdxeditor/editor/style.css";
import {
  MDXEditor,
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  markdownShortcutPlugin,
  toolbarPlugin,
  ConditionalContents,
  InsertCodeBlock,
  ChangeCodeMirrorLanguage,
  codeBlockPlugin,
  codeMirrorPlugin,
  UndoRedo,
  BoldItalicUnderlineToggles,
  BlockTypeSelect,
  ListsToggle,
  CodeToggle,
  DiffSourceToggleWrapper,
  diffSourcePlugin,
  linkPlugin,
  linkDialogPlugin,
  CreateLink,
  imagePlugin,
  InsertImage,
  InsertThematicBreak,
  thematicBreakPlugin,
  tablePlugin,
  InsertTable,
} from "@mdxeditor/editor";
import {
  syntaxHighlighting,
  defaultHighlightStyle,
} from "@codemirror/language";
interface PropsEditer {
  markdown: string;
  defaultMarkdown: string;
  editorRef?: any;
  onChange?: (value: string) => void;
}

export default function MDXEditer({
  markdown = "# Hello World!",
  defaultMarkdown = "",
  editorRef,
  onChange,
}: PropsEditer) {
  return (
    <div className="border-[1px]">
      <MDXEditor
        contentEditableClassName="prose max-w-full"
        onChange={onChange}
        ref={editorRef}
        markdown={markdown}
        plugins={[
          headingsPlugin(),
          listsPlugin(),
          quotePlugin(),
          markdownShortcutPlugin(),
          linkPlugin(),
          linkDialogPlugin(),
          thematicBreakPlugin(),
          tablePlugin(),
          codeBlockPlugin({ defaultCodeBlockLanguage: "js", }),
          codeMirrorPlugin({
            codeMirrorExtensions: [syntaxHighlighting(defaultHighlightStyle)],
            codeBlockLanguages: {
              js: "JavaScript",
              ts: "TypeScript",
              json: "Json",
              cpp: "CPP",
              css: "CSS",
              html: "HTML",
              txt: "Text",
              tsx: "TSX",
              jsx: "JSX",
              bash: "Bash",
              shell: "shell",
            },
          }),
          diffSourcePlugin({
            diffMarkdown: defaultMarkdown,
            viewMode: "rich-text",
          }),
          imagePlugin({
            imageUploadHandler: () => {
              return Promise.resolve('https://picsum.photos/200/300')
            },
            imageAutocompleteSuggestions: ['https://picsum.photos/200/300', 'https://picsum.photos/200']
          }),
         
          toolbarPlugin({
            toolbarContents: () => (
              <DiffSourceToggleWrapper>
                <UndoRedo />
                <div>|</div>
                <BoldItalicUnderlineToggles />
                <div>|</div>
                <ListsToggle />
                <BlockTypeSelect />
                <div>|</div>
                <CreateLink />
                <InsertImage />
                <div>|</div>
                <InsertTable />
                <InsertThematicBreak />
                <div>|</div>
                <ConditionalContents
                  options={[
                    {
                      when: (editor) => editor?.editorType === "codeblock",
                      contents: () => <ChangeCodeMirrorLanguage />,
                    },
                    {
                      fallback: () => (
                        <>
                          <InsertCodeBlock />
                          <CodeToggle />
                        </>
                      ),
                    },
                  ]}
                />
              </DiffSourceToggleWrapper>
            ),
          }),
        ]}
      />
    </div>
  );
}
