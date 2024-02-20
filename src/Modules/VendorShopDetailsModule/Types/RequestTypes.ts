export type CREATE_DYNAMIC_LINK_FOR_RATING_REQUEST = {
    dynamicLinkInfo: {
      domainUriPrefix: string;
      link: string;
      androidInfo: {
        androidPackageName: string;
        androidFallbackLink: string;
      };
      iosInfo: {
        iosBundleId: string;
        iosFallbackLink: string;
      };
    };
  };