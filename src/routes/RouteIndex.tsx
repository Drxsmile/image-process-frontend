import ErrorPage from "../components/ErrorPage";
import Homepage from "../components/Homepage";
import NotFound from "../components/NotFound";
import RelatedImage from "../components/RelatedImage";
import SaveImage from "../components/SaveImage";
import SearchImage from "../components/SearchImage";
import UpdateImage from "../components/UpdateImage";

export const appRoutes = [
  {
    path: "/home",
    // tslint:disable-next-line:object-literal-sort-keys
    component: Homepage
  },
  {
    path: "/save",
    // tslint:disable-next-line:object-literal-sort-keys
    component: SaveImage
  },
  {
    path: "/404",
    // tslint:disable-next-line:object-literal-sort-keys
    component: NotFound
  },
  {
    path: "/search",
    // tslint:disable-next-line:object-literal-sort-keys
    component: SearchImage
  },
  {
    path: "/error",
    // tslint:disable-next-line:object-literal-sort-keys
    component: ErrorPage
  },
  {
    path: "/update/:id/:name",
    // tslint:disable-next-line:object-literal-sort-keys
    component: UpdateImage
  },
  {
    path: "/related/:id/:name",
    // tslint:disable-next-line:object-literal-sort-keys
    component: RelatedImage
  }
];
