import ErrorPage from "../components/ErrorPage";
import Homepage from "../components/Homepage";
import NotFound from "../components/NotFound";
import RelatedImage from "../components/RelatedImage";
import SaveImage from "../components/SaveImage";
import SaveSuccess from "../components/SaveSuccess";
import SearchImage from "../components/SearchImage";

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
    path: "/success",
    // tslint:disable-next-line:object-literal-sort-keys
    component: SaveSuccess
  },
  {
    path: "/related/:id",
    // tslint:disable-next-line:object-literal-sort-keys
    component: RelatedImage
  }
];
