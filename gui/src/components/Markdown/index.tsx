"use client";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import rehypeRaw from "rehype-raw";
import Image from "next/image";
import gfm from "remark-gfm";
import { FaCheck } from "react-icons/fa6";
interface Markdown {
  content: string;
}

export default function Markdown({ content }: Markdown) {
  return (
    <ReactMarkdown
      className={"prose max-w-full"}
      rehypePlugins={[rehypeRaw, gfm]}
      components={{
        code({ inline, className, ...props }: any) {
          const hasLang = /language-(\w+)/.exec(className || "");
          return !inline && hasLang ? (
            <SyntaxHighlighter
              style={oneLight}
              language={hasLang[1]}
              PreTag="div"
              showLineNumbers={true}
              useInlineStyles={true}
            >
              {String(props.children).replace(/\n$/, "")}
            </SyntaxHighlighter>
          ) : (
            <code className={className} {...props} />
          );
        },
        pre: (pre) => {
          const children = (pre as any).node.children[0].children[0];
          const codeChunk = children.value as string;
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const [copyTip, setCopyTip] = useState("Copy code");

          return (
            <div className="relative overflow-x-hidden">
              <button
                className="right-0 tooltip tooltip-left absolute z-5 mr-[10px] mt-[10px]"
                data-tip={copyTip}
              >
                <CopyToClipboard
                  text={codeChunk}
                  onCopy={async () => {
                    setCopyTip("Copied");
                    await new Promise((resolve) => setTimeout(resolve, 500));
                    setCopyTip(`Copy code`);
                  }}
                >
                  <div className="flex">
                    {copyTip === "Copied" && (
                      <div className="flex justify-center text-center items-center mr-[10px]">
                        <span className="flex bg-[#655454] rounded-sm p-[4px] text-white text-[12px] px-[10px]">
                          Copied
                          <FaCheck className="text-[var(--green)] font-bold mx-[2px] mt-[2px]" />
                        </span>
                      </div>
                    )}
                    <Image
                      className="bg-[#655454] p-[4px] rounded-sm opacity-60 hover:opacity-100"
                      width={26}
                      height={26}
                      src={"/svg/ic_copy.svg"}
                      alt="icon-copy"
                    />
                  </div>
                </CopyToClipboard>
              </button>
              <pre {...pre} className="!bg-white !p-0"></pre>
            </div>
          );
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
