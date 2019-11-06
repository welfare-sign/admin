import Vue from 'vue'
import {
	Button,
	Container,
	Header,
	Aside,
	Main,
	Menu,
	MenuItem,
	Pagination,
	Table,
	TableColumn,
	Form,
	FormItem,
	Image,
	Input,
	InputNumber,
	Select,
	Option,
	Upload,
	MessageBox,
	Message,
	Dialog,
	Checkbox,
	CheckboxButton,
	CheckboxGroup,
	Autocomplete
} from 'element-ui'

Vue.use(Button)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Pagination)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Image)
Vue.use(Input)
Vue.use(InputNumber)
Vue.use(Select)
Vue.use(Option)
Vue.use(Upload)
Vue.use(Dialog)
Vue.use(Checkbox)
Vue.use(CheckboxButton)
Vue.use(CheckboxGroup)
Vue.use(Autocomplete)
// Vue.use(MessageBox);
// Vue.use(Message);

Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$message = Message
