import { SearchParam } from "./types";

export const IMAGE_TYPE = ['.png', '.jpg', '.jpeg', '.jfif', '.webp']
export const VIDEO_TYPE = ['.mp4', '.mov', '.avi', '.mkv']

export const PostContent =
  "Some quick example text to build on the card title and make up the bulk of the  content.";
export const FakeDataPost = [
  {
    id: 1,
    title: "Python for Data Science and Machine Learning Bootcamp ",
    slug: "slug-123",
    thumbnail: "/image/logo1.jpeg",
    content: PostContent,
  },
  {
    id: 2,
    title: "New post 2",
    slug: "slug-123",
    thumbnail: "/image/logo2.jpeg",
    content: PostContent,
  },
  {
    id: 3,
    title: "New post 3",
    slug: "slug-123",
    thumbnail: "/image/logo3.jpeg",
    content: PostContent,
  },
  {
    id: 4,
    title: "New post 4",
    slug: "slug-123",
    thumbnail: "/image/logo1.jpeg",
    content: PostContent,
  },
  {
    id: 5,
    title: "New post 5",
    slug: "slug-123",
    thumbnail: "/image/logo1.jpeg",
    content: PostContent,
  },
  {
    id: 6,
    title: "New post 6",
    slug: "slug-123",
    thumbnail: "/image/logo1.jpeg",
    content: PostContent,
  },
  {
    id: 7,
    title: "New post 7",
    slug: "slug-123",
    thumbnail: "/image/logo2.jpeg",
    content: PostContent,
  },
];

export const FakeDataUser = [
  {
    id: 1,
    email: "nvsa@gmail.com",
    display_name: "Nguyen van a",
    phone: "1234567890"
  },
  {
    id: 2,
    email: "nvsa@gmail.com",
    display_name: "Nguyen van a",
    phone: "1234567890"
  },
  {
    id: 3,
    email: "nvsa@gmail.com",
    display_name: "Nguyen van a",
    phone: "1234567890"
  },
  {
    id: 4,
    email: "nvsa@gmail.com",
    display_name: "Nguyen van a",
    phone: "1234567890"
  },
  {
    id: 5,
    email: "nvsa@gmail.com",
    display_name: "Nguyen van a",
    phone: "1234567890"
  },
  {
    id: 6,
    email: "nvsa@gmail.com",
    display_name: "Nguyen van a",
    phone: "1234567890"
  },
  {
    id: 7,
    email: "nvsa@gmail.com",
    display_name: "Nguyen van a",
    phone: "1234567890"
  },
];


export const CONTENT_EDITER = `
<h2>
  Hi there,
</h2>
<p>
  this is a <em>basic</em> example of <strong>tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:
</p>
<ul>
  <li>
    That’s a bullet list with one …
  </li>
  <li>
    … or two list items.
  </li>
</ul>
<p>
  Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:
</p>
<pre><code class="language-css">body {
display: none;
}</code></pre>
<p>
  I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too.
</p>
<blockquote>
  Wow, that’s amazing. Good work, boy! 👏
  <br />
  — Mom
</blockquote>
`;

export const DEFAULT_AVATAR = "https://i.pravatar.cc/150?u=a04258114e29026708c"
export const OPTION_PAGE = [
  { value: 10, label: '10 / page' },
  { value: 20, label: '20 / page' },
  { value: 50, label: '50 / page' },
  { value: 100, label: '100 / page' },
]

export const DEFAULT_PARAMS: SearchParam = {
  page: '1',
  limit: "10",
};
export const EMAIL_PATTERN =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
