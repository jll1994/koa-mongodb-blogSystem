import Vue from "vue";
import {
  Row,
  Col,
  Menu,
  MenuItem,
  Button,
  Link,
  Form,
  FormItem,
  Input,
  Select,
  Option,
  Icon,
  Tag,
  Avatar,
  Message,
  MessageBox
} from "element-ui";
Vue.use(Row);
Vue.use(Col);
Vue.use(Menu);
Vue.use(MenuItem);
Vue.use(Button);
Vue.use(Link);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Select);
Vue.use(Option);
Vue.use(Icon);
Vue.use(Tag);
Vue.use(Avatar);

Vue.prototype.$message = Message;
Vue.prototype.$msgBox = MessageBox;
