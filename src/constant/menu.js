import { Book, Briefcase,Frown,Command,Info, CreditCard,DollarSign,FileText, Home, Settings, Slash, User } from 'react-feather';

const userType = localStorage.getItem('userType')
// console.log(userType,'adarsh')

export const MENUITEMS = userType === 'customer' ? [
    {
        title: 'Dashboard', path: '/userdashboard', icon: Home, type: 'link', badgeType: 'primary', active: true
    },

    {
        title: 'Project', path: '/project', icon: Briefcase, type: 'link', active: false
    },
    {
        title: 'Worklog', path: '/workloglist', icon: Settings, type: 'link', active: false
    },

    {
        title: 'Invoice', path: '/invoice', icon: DollarSign, type: 'link', active: false
    },
    {
        title: 'Payment', path: '/user/myPublishedPost', icon: CreditCard, type: 'link', active: false
    },
    {
        title: 'Contract', path: '/contract', icon: FileText, type: 'link', active: false
    },

    {
        title: 'Connect', path: '/connect', icon: Frown, type: 'link', active: false
    },

    {
        title: 'Order', path: '/order', icon: Slash, type: 'link', active: false
    },
    {
        title: 'support', path: '/support', icon: Command, type: 'link', active: false
    },
    {
        title: 'notification', path: '/user/notification', icon: Command, type: 'link', active: false
    },

] : userType === 'engineeringfirm' ?
    [
        {
            title: 'Dashboard', path: '/userdashboard', icon: Home, type: 'link', badgeType: 'primary', active: true
        },
        {
            title: 'Project', path: '/project', icon: Briefcase, type: 'link', active: false
        },
        {
            title: 'Worklog', path: '/workloglist', icon: Settings, type: 'link', active: false
        },
        {
            title: 'Invoice', path: '/invoice', icon: User, type: 'link', active: false
        },
        {
            title: 'Payment', path: '/user/myPublishedPost', icon: CreditCard, type: 'link', active: false
        },
        {
            title: 'Crew', path: '/crew', icon: Book, type: 'link', active: false
        },
        {
            title: 'Contract', path: '/contract', icon: FileText, type: 'link', active: false
        },
        {
            title: 'Connect', path: '/connect', icon: Frown, type: 'link', active: false
        },
        {
            title: 'E-Fpricings', path: '/efpricings', icon: DollarSign, type: 'link', active: false
        },
        {
            title: 'support', path: '/support', icon: Command, type: 'link', active: false
        },
        {
            title: 'Outsource', path: '/outsource', icon: Info, type: 'link', active: false
        },
        {
            title: 'notification', path: '/user/notification', icon: Command, type: 'link', active: false
        },
    ] : userType === 'engineer' ?
        [
            {
                title: 'Dashboard', path: 'userdashboard', icon: Home, type: 'link', badgeType: 'primary', active: true
            },
            {
                title: 'Project', path: '/project', icon: Briefcase, type: 'link', active: false
            },
            {
                title: 'Worklog', path: '/workloglist', icon: Settings, type: 'link', active: false
            },
            {
                title: 'Crew', path: '/crewEngineer', icon: Book, type: 'link', active: false
            },
            {
                title: 'Connect', path: '/connect', icon: Frown, type: 'link', active: false
            },
            {
                title: 'support', path: '/support', icon: Command, type: 'link', active: false 
            },
            {
                title: 'notification', path: '/user/notification', icon: Command, type: 'link', active: false
            },
        ] : userType === 'outsourcecompany' ?
            [
                {
                    title: 'Dashboard', path: 'userdashboard', icon: Home, type: 'link', badgeType: 'primary', active: true
                },
                {
                    title: 'support', path: '/support', icon: Command, type: 'link', active: false
                },
                {
                    title: 'Outsource', path: '/outsource', icon: Info, type: 'link', active: false
                },
                {
                    title: 'notification', path: '/user/notification', icon: Command, type: 'link', active: false
                },
            ] : []