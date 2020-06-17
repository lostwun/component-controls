# Table of contents

-   [Overview](#overview)
-   [List of components](#list-of-components)
    -   [<ins>App</ins>](#insappins)
    -   [<ins>AppContext</ins>](#insappcontextins)
    -   [<ins>CategoryList</ins>](#inscategorylistins)
    -   [<ins>CategoryListItem</ins>](#inscategorylistitemins)
    -   [<ins>CategoryPage</ins>](#inscategorypageins)
    -   [<ins>Container</ins>](#inscontainerins)
    -   [<ins>DocPage</ins>](#insdocpageins)
    -   [<ins>DocumentsList</ins>](#insdocumentslistins)
    -   [<ins>DocumentsListItem</ins>](#insdocumentslistitemins)
    -   [<ins>Footer</ins>](#insfooterins)
    -   [<ins>Header</ins>](#insheaderins)
    -   [<ins>DocLink</ins>](#insdoclinkins)
    -   [<ins>DocsLink</ins>](#insdocslinkins)
    -   [<ins>StoryLink</ins>](#insstorylinkins)
    -   [<ins>PageContainer</ins>](#inspagecontainerins)
    -   [<ins>PageList</ins>](#inspagelistins)
    -   [<ins>SEO</ins>](#insseoins)
    -   [<ins>SideContext</ins>](#inssidecontextins)
    -   [<ins>Sidebar</ins>](#inssidebarins)
    -   [<ins>SidebarsMDXPage</ins>](#inssidebarsmdxpageins)
    -   [<ins>SidebarsPage</ins>](#inssidebarspageins)
    -   [<ins>SidebarsStoryPage</ins>](#inssidebarsstorypageins)
    -   [<ins>TagsList</ins>](#instagslistins)

# Overview

Components to create `@component-controls` standalone application, that are connected to the store of documents.

Some of the design goals:

-   Portability between different build systems ie - Gatsby, CRA, Vercel.
-   Create a true CMS-type user-interface, allowing for different document types ie. "stories", "blogs", "articles".
-   Category pages for "tags", "authors".
-   Fully customizable Home page.
-   Responsive user/interface, with sidebars transforming into popouts for small screen resolutions.

# List of components

<react-docgen-typescript path="./src" exclude=".ts$,.stories.tsx$" />

<!-- START-REACT-DOCGEN-TYPESCRIPT -->

## <ins>App</ins>

application container component. adds SEO, SkipLinks, Header and Footer.

_App [source code](https:/github.com/ccontrols/component-controls/tree/master/ui/app/src/App/App.tsx)_

### properties

| Name    | Type     | Description |
| ------- | -------- | ----------- |
| `title` | _string_ | page title  |

## <ins>AppContext</ins>

_AppContext [source code](https:/github.com/ccontrols/component-controls/tree/master/ui/app/src/AppContext/AppContext.tsx)_

### properties

| Name         | Type           | Description |
| ------------ | -------------- | ----------- |
| `type`       | _PageType_     |             |
| `docId`      | _string_       |             |
| `store`      | _LoadingStore_ |             |
| `linkClass*` | _any_          |             |

## <ins>CategoryList</ins>

displays page of categories

_CategoryList [source code](https:/github.com/ccontrols/component-controls/tree/master/ui/app/src/CategoryList/CategoryList.tsx)_

### properties

| Name    | Type       | Description |
| ------- | ---------- | ----------- |
| `type*` | _PageType_ | page type   |

## <ins>CategoryListItem</ins>

category list item displays the unique categories with a link, and the count of docs for each

_CategoryListItem [source code](https:/github.com/ccontrols/component-controls/tree/master/ui/app/src/CategoryList/CategoryListItem.tsx)_

### properties

| Name     | Type     | Description                         |
| -------- | -------- | ----------------------------------- |
| `link*`  | _string_ | link url                            |
| `name*`  | _string_ | category name                       |
| `count*` | _number_ | how many documents of this category |

## <ins>CategoryPage</ins>

_CategoryPage [source code](https:/github.com/ccontrols/component-controls/tree/master/ui/app/src/CategoryPage/CategoryPage.tsx)_

### properties

| Name        | Type       | Description |
| ----------- | ---------- | ----------- |
| `type*`     | _PageType_ |             |
| `category*` | _any_      |             |

## <ins>Container</ins>

application inner container for pages. Adds pagination to the blocks/Container component.

_Container [source code](https:/github.com/ccontrols/component-controls/tree/master/ui/app/src/Container/Container.tsx)_

## <ins>DocPage</ins>

documentation page for current document.
will check if the page has a layout with sidebars or if the page is standalone.

_DocPage [source code](https:/github.com/ccontrols/component-controls/tree/master/ui/app/src/DocPage/DocPage.tsx)_

### properties

| Name        | Type       | Description     |
| ----------- | ---------- | --------------- |
| `type`      | _PageType_ | page type       |
| `activeTab` | _string_   | active page tab |

## <ins>DocumentsList</ins>

displays a list of the provided document pages

_DocumentsList [source code](https:/github.com/ccontrols/component-controls/tree/master/ui/app/src/DocumentsList/DocumentsList.tsx)_

### properties

| Name     | Type    | Description            |
| -------- | ------- | ---------------------- |
| `pages*` | _Pages_ | list of document pages |

## <ins>DocumentsListItem</ins>

displays a single doument item

_DocumentsListItem [source code](https:/github.com/ccontrols/component-controls/tree/master/ui/app/src/DocumentsList/DocumentsListItem.tsx)_

### properties

| Name     | Type               | Description                |
| -------- | ------------------ | -------------------------- |
| `link*`  | _string_           | link to the document       |
| `page*`  | _StoriesDoc_       | document to be displayed   |
| `config` | _RunConfiguration_ | store configuration object |

## <ins>Footer</ins>

application footer component

_Footer [source code](https:/github.com/ccontrols/component-controls/tree/master/ui/app/src/Footer/Footer.tsx)_

## <ins>Header</ins>

application header component

_Header [source code](https:/github.com/ccontrols/component-controls/tree/master/ui/app/src/Header/Header.tsx)_

## <ins>DocLink</ins>

native lonk to a documentation page

_DocLink [source code](https:/github.com/ccontrols/component-controls/tree/master/ui/app/src/Links/DocLink.tsx)_

### properties

| Name  | Type                                                                         | Description |
| ----- | ---------------------------------------------------------------------------- | ----------- |
| `id`  | _string_                                                                     |             |
| `ref` | _((instance: HTMLAnchorElement) => void) \| RefObject&lt;HTMLAnchorElement>_ |             |

## <ins>DocsLink</ins>

native lonk to the documentation

_DocsLink [source code](https:/github.com/ccontrols/component-controls/tree/master/ui/app/src/Links/DocsLink.tsx)_

### properties

| Name  | Type                                                                         | Description |
| ----- | ---------------------------------------------------------------------------- | ----------- |
| `ref` | _((instance: HTMLAnchorElement) => void) \| RefObject&lt;HTMLAnchorElement>_ |             |

## <ins>StoryLink</ins>

native lonk to a story

_StoryLink [source code](https:/github.com/ccontrols/component-controls/tree/master/ui/app/src/Links/StoryLink.tsx)_

### properties

| Name  | Type                                                                         | Description |
| ----- | ---------------------------------------------------------------------------- | ----------- |
| `id`  | _string_                                                                     |             |
| `ref` | _((instance: HTMLAnchorElement) => void) \| RefObject&lt;HTMLAnchorElement>_ |             |

## <ins>PageContainer</ins>

page container to enhance the inner page wrapper

_PageContainer [source code](https:/github.com/ccontrols/component-controls/tree/master/ui/app/src/PageContainer/PageContainer.tsx)_

### properties

| Name      | Type                                                                                                                                                                                                                                                                                  | Description                         |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------- |
| `type*`   | _PageType_                                                                                                                                                                                                                                                                            | page type                           |
| `variant` | _string_                                                                                                                                                                                                                                                                              | theme variant                       |
| `ref`     | _((instance: HTMLDivElement) => void) \| RefObject&lt;HTMLDivElement> \| (((instance: HTMLDivElement) => void) & string) \| (((instance: HTMLDivElement) => void) & RefObject&lt;...>) \| (RefObject&lt;...> & string) \| (RefObject&lt;...> & ((instance: HTMLDivElement) => void))_ | ref to the page container component |

## <ins>PageList</ins>

list of documents for a specific page type

_PageList [source code](https:/github.com/ccontrols/component-controls/tree/master/ui/app/src/PageList/PageList.tsx)_

### properties

| Name    | Type       | Description |
| ------- | ---------- | ----------- |
| `type*` | _PageType_ |             |

## <ins>SEO</ins>

_SEO [source code](https:/github.com/ccontrols/component-controls/tree/master/ui/app/src/SEO/SEO.tsx)_

### properties

| Name          | Type     | Description |
| ------------- | -------- | ----------- |
| `title`       | _string_ |             |
| `description` | _string_ |             |
| `pathname`    | _string_ |             |
| `image`       | _string_ |             |

## <ins>SideContext</ins>

_SideContext [source code](https:/github.com/ccontrols/component-controls/tree/master/ui/app/src/SideContext/SideContext.tsx)_

### properties

| Name      | Type                           | Description |
| --------- | ------------------------------ | ----------- |
| `pageRef` | _RefObject&lt;HTMLDivElement>_ |             |

## <ins>Sidebar</ins>

application sidebar component

_Sidebar [source code](https:/github.com/ccontrols/component-controls/tree/master/ui/app/src/Sidebar/Sidebar.tsx)_

### properties

| Name        | Type        | Description                                           |
| ----------- | ----------- | ----------------------------------------------------- |
| `title`     | _ReactNode_ | title element                                         |
| `type`      | _PageType_  | page type                                             |
| `activeTab` | _string_    | currently active tab. Use to creae the sidemenu links |

## <ins>SidebarsMDXPage</ins>

document page - rendering with sidebars and tabs for multiple document views

_SidebarsMDXPage [source code](https:/github.com/ccontrols/component-controls/tree/master/ui/app/src/SidebarsPage/SidebarsMDXPage.tsx)_

### properties

| Name    | Type       | Description |
| ------- | ---------- | ----------- |
| `type*` | _PageType_ | page type   |

## <ins>SidebarsPage</ins>

_SidebarsPage [source code](https:/github.com/ccontrols/component-controls/tree/master/ui/app/src/SidebarsPage/SidebarsPage.tsx)_

### properties

| Name        | Type       | Description     |
| ----------- | ---------- | --------------- |
| `type*`     | _PageType_ | page type       |
| `activeTab` | _string_   | active page tab |

## <ins>SidebarsStoryPage</ins>

document page - rendering with sidebars and tabs for multiple document views

_SidebarsStoryPage [source code](https:/github.com/ccontrols/component-controls/tree/master/ui/app/src/SidebarsPage/SidebarsStoryPage.tsx)_

### properties

| Name        | Type       | Description     |
| ----------- | ---------- | --------------- |
| `type*`     | _PageType_ | page type       |
| `activeTab` | _string_   | active page tab |

## <ins>TagsList</ins>

row of tags with link to their page

_TagsList [source code](https:/github.com/ccontrols/component-controls/tree/master/ui/app/src/TagsList/TagsList.tsx)_

### properties

| Name   | Type        | Description              |
| ------ | ----------- | ------------------------ |
| `tags` | _string\[]_ | string list of tag names |

<!-- END-REACT-DOCGEN-TYPESCRIPT -->