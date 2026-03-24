import type * as prismic from "@prismicio/client";

// Types pour le custom type "homepage"
export interface HomepageDocumentData {
  [key: string]: any;
  slices: prismic.SliceZone;
  meta_title: prismic.KeyTextField;
  meta_description: prismic.KeyTextField;
  meta_image: prismic.ImageField<never>;
}

export type HomepageDocument<Lang extends string = string> =
  prismic.PrismicDocumentWithoutUID<
    HomepageDocumentData,
    "homepage",
    Lang
  >;

// Types pour le custom type "jobs"
export interface JobsDocumentDataTagsItem {
  [key: string]: any;
  tag: prismic.KeyTextField;
}

export interface JobsDocumentData {
  [key: string]: any;
  title: prismic.KeyTextField;
  company: prismic.KeyTextField;
  location: prismic.KeyTextField;
  contract_type: prismic.SelectField;
  salary: prismic.KeyTextField;
  tags: prismic.GroupField<JobsDocumentDataTagsItem>;
  short_description: prismic.KeyTextField;
  description: prismic.RichTextField;
  published_date: prismic.DateField;
  meta_title: prismic.KeyTextField;
  meta_description: prismic.KeyTextField;
}

export type JobsDocument<Lang extends string = string> =
  prismic.PrismicDocumentWithUID<
    JobsDocumentData,
    "jobs",
    Lang
  >;

// Type union de tous les documents
export type PrismicDocument = HomepageDocument | JobsDocument;

// Déclaration pour @prismicio/client
declare module "@prismicio/client" {
  namespace Content {
    export type {
      HomepageDocument,
      HomepageDocumentData,
      JobsDocument,
      JobsDocumentData,
      JobsDocumentDataTagsItem,
    };
  }
}
