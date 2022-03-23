import {
    BsPersonFill,
    BsPeopleFill,
    BsTagsFill,
    BsHouseFill,
    BsGlobe,
    BsBookHalf,
    BsFolderFill,
} from 'react-icons/bs';
import { BiPoll, BiGlobe, BiHelpCircle } from 'react-icons/bi';
import { MdRssFeed } from 'react-icons/md';

export const navLinks = [
    {
        icon: <BsHouseFill />,
        name: 'Home',
        url: '/',
    },
    {
        icon: <MdRssFeed />,
        name: 'Feed',
        url: '/',
    },
    {
        icon: <BsPersonFill />,
        name: 'User Profile',
        url: '/',
    },
    {
        icon: <BsFolderFill />,
        name: 'Communities',
        url: '/communities',
    },
    {
        icon: <BsBookHalf />,
        name: 'Questions',
        url: '/questions',
    },
    {
        icon: <BiPoll />,
        name: 'Polls',
        url: '/polls',
    },
    {
        icon: <BsGlobe />,
        name: 'Groups',
        url: '/groups',
    },
    {
        icon: <BiGlobe />,
        name: 'Add Group',
        url: '/add-group',
    },
    {
        icon: <BsTagsFill />,
        name: 'Tags',
        url: '/tags',
    },
    {
        icon: <BsPeopleFill />,
        name: 'Users',
        url: '/users',
    },
    {
        icon: <BiHelpCircle />,
        name: 'Help',
        url: '/faqs',
    },
];
