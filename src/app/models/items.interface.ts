
export interface items {
    id: string,
    name: string,
    folder: boolean,
    creation: string,
    modification: string,
    _links: {
      children: {
        href:string,
        type: string
      },
      delete: {
        href: string,
        type: string
      },
      update: {
        href:string,
        type: string
      },
      upload: {
        href: string,
        type: string
      }
    }
  }
   