import { 
  UploadOutlined,
  TeamOutlined,
  HomeOutlined,
  SnippetsOutlined,
  ScissorOutlined,
  AlignCenterOutlined,
  DiffOutlined,
  FormOutlined,
  PlayCircleOutlined
} from '@ant-design/icons';

export default [
  {
    title: '首页',
    path: '/home',
    permission:1,
    icon: HomeOutlined
  },
  {
    title: '用户管理',
    path: '/user-manage',
    permission:3,
    icon: UploadOutlined,
    children:[
      {
        title:"用户列表",
        icon: TeamOutlined,
        path:"/user-manage/users"
      }
    ]
  },
  {
    title:'权限管理',
    path:'/right-manage',
    permission:2,
    icon:SnippetsOutlined,
    children:[
        {
          title:'角色列表',
          icon:TeamOutlined,
          permission:2,
          path:'/right-manage/roles'
        },
        {
          title:'权限列表',
          icon:ScissorOutlined,
          permission:2,
          path:'/right-manage/rights'
        }
    ]
  },
  {
    title:'文章管理',
    icon:AlignCenterOutlined,
    path:'/article-manage',
    permission:1,
    children:[
      {
        title:'文章列表',
        icon:FormOutlined,
        permission:1,
        path:'/article-manage/list'
      },
      {
        title:'文章分类',
        icon:DiffOutlined,
        permission:2,
        path:'/article-manage/category'
      }
    ]
  },
  {
    title: '音乐列表',
    icon: PlayCircleOutlined,
    permission:1,
    path: '/music-list'
  }
]
