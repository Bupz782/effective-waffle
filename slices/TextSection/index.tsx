import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps, PrismicRichText } from "@prismicio/react";
import { isFilled } from "@prismicio/client";

/**
 * Props for `TextSection`.
 */
export type TextSectionProps = SliceComponentProps<Content.TextSectionSlice>;

/**
 * Component for "TextSection" Slices.
 */
const TextSection: FC<TextSectionProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="py-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-3xl mx-auto prose prose-lg prose-blue">
        {isFilled.richText(slice.primary.content) && (
          <PrismicRichText
            field={slice.primary.content}
            components={{
              heading2: ({ children }) => (
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-8 mb-4">
                  {children}
                </h2>
              ),
              heading3: ({ children }) => (
                <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mt-6 mb-3">
                  {children}
                </h3>
              ),
              paragraph: ({ children }) => (
                <p className="text-gray-700 mb-4 leading-relaxed">{children}</p>
              ),
              listItem: ({ children }) => (
                <li className="text-gray-700 mb-2">{children}</li>
              ),
              oListItem: ({ children }) => (
                <li className="text-gray-700 mb-2">{children}</li>
              ),
              strong: ({ children }) => (
                <strong className="font-semibold text-gray-900">{children}</strong>
              ),
              hyperlink: ({ children, node }) => (
                <a
                  href={node.data.url}
                  target={"target" in node.data ? node.data.target || undefined : undefined}
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  {children}
                </a>
              ),
            }}
          />
        )}
      </div>
    </section>
  );
};

export default TextSection;
