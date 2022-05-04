import {
    BsPersonFill,
    BsPeopleFill,
    BsTagsFill,
    BsHouseFill,
    BsGlobe,
    BsBookHalf,
    BsFolderFill,
    BsPenFill,
} from 'react-icons/bs';
import {
    BiPoll,
    BiGlobe,
    BiHelpCircle,
    BiUserVoice,
    BiLogOut,
} from 'react-icons/bi';
import { MdRssFeed } from 'react-icons/md';
import { FiActivity } from 'react-icons/fi';

export const headerNavLinks = [
    {
        name: 'Home',
        url: '/',
    },
    {
        name: 'About Us',
        url: '/about-us',
    },
    {
        name: 'Contact Us',
        url: '/contact-us',
    },
];

export const navLinks = [
    {
        icon: <BsHouseFill />,
        name: 'Home',
        url: '/',
    },
    {
        icon: <MdRssFeed />,
        name: 'Feed',
        url: '/feed',
    },
    {
        icon: <BsPersonFill />,
        name: 'User Profile',
        url: '/profile',
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

export const faqQuestions = [
    {
        _id: 1,
        question: 'What topics can I ask about here?',
        answer: 'Questions that need additional work or that are not a good fit for this site may be put on hold by experienced community members. While questions are on hold, they cannot be answered, but can be edited to make them eligible for reopening.',
    },
    {
        _id: 2,
        question: 'What types of questions should I avoid asking?',
        answer: 'Questions that need additional work or that are not a good fit for this site may be put on hold by experienced community members. While questions are on hold, they cannot be answered, but can be edited to make them eligible for reopening.',
    },
    {
        _id: 3,
        question: 'What does it mean if a question is?',
        answer: 'Questions that need additional work or that are not a good fit for this site may be put on hold by experienced community members. While questions are on hold, they cannot be answered, but can be edited to make them eligible for reopening.',
    },
    {
        _id: 4,
        question: 'How to create a Minimal, Complete, and Verifiable example?',
        answer: 'Questions that need additional work or that are not a good fit for this site may be put on hold by experienced community members. While questions are on hold, they cannot be answered, but can be edited to make them eligible for reopening.',
    },
    {
        _id: 5,
        question:
            'What if I disagree with the closure of a question? How to reopen it?',
        answer: 'Questions that need additional work or that are not a good fit for this site may be put on hold by experienced community members. While questions are on hold, they cannot be answered, but can be edited to make them eligible for reopening.',
    },
    {
        _id: 6,
        question:
            'Why do I see a message that my question does not meet standards?',
        answer: 'Questions that need additional work or that are not a good fit for this site may be put on hold by experienced community members. While questions are on hold, they cannot be answered, but can be edited to make them eligible for reopening.',
    },

    {
        _id: 7,
        question: 'Why are some questions marked as duplicate?',
        answer: 'Questions that need additional work or that are not a good fit for this site may be put on hold by experienced community members. While questions are on hold, they cannot be answered, but can be edited to make them eligible for reopening.',
    },
    {
        _id: 8,
        question: 'Why are questions no longer being accepted from my account?',
        answer: 'Questions that need additional work or that are not a good fit for this site may be put on hold by experienced community members. While questions are on hold, they cannot be answered, but can be edited to make them eligible for reopening.',
    },
    {
        _id: 9,
        question:
            'Why is the system asking me to wait a day before asking another?',
        answer: 'Questions that need additional work or that are not a good fit for this site may be put on hold by experienced community members. While questions are on hold, they cannot be answered, but can be edited to make them eligible for reopening.',
    },
    {
        _id: 10,
        question: 'How do I ask a good question?',
        answer: 'Questions that need additional work or that are not a good fit for this site may be put on hold by experienced community members. While questions are on hold, they cannot be answered, but can be edited to make them eligible for reopening.',
    },
];

export const dropDownMenu = [
    {
        _id: 0,
        name: 'User Profile',
        icon: <BsPersonFill />,
        url: '/about-us',
    },
    {
        _id: 1,
        name: 'Edit Profile',
        icon: <BsPenFill />,
        url: '/contact-us',
    },
    {
        _id: 2,
        name: 'Groups',
        icon: <BsGlobe />,
        url: '',
    },
    {
        _id: 3,
        name: 'Asked Questions',
        icon: <BiUserVoice />,
        url: '',
    },
    {
        _id: 4,
        name: 'Activity Log',
        icon: <FiActivity />,
        url: '',
    },
    {
        _id: 5,
        name: 'Logout',
        icon: <BiLogOut />,
        url: '/logout',
    },
];

export const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];
