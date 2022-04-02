import React from 'react';
import { SingleQuestion } from '.';

const questions = [
    {
        _id: 1,
        question: `Is this statement, “i see him last night” can be understood as “I saw him last night”?`,
        description:
            'In my local language (Bahasa Indonesia) there are no verb-2 or past tense form as time tracker. So, I often forget to use the past form of verb when speaking english. I saw him last night (correct) I see him last night. In my local language (Bahasa Indonesia) there are no verb-2 or past tense form as time tracker. So, I often forget to use the past form of verb when speaking english. I saw him last night (correct) I see him last night',
        isAnonymous: false,
        user: {
            _id: 1,
            fullName: `John Deo`,
            avatar: ``,
            badge: 'beginner',
        },
        likes: 118,
        createdAt: '2022-04-02T03:44:23.700Z',
        category: 'language',
        tags: ['english', 'nihal'],
        answers: 3,
        views: 12000,
    },
    {
        _id: 1,
        question: `Is this statement, “i see him last night” can be understood as “I saw him last night”?`,
        description:
            'In my local language (Bahasa Indonesia) there are no verb-2 or past tense form as time tracker. So, I often forget to use the past form of verb when speaking english. I saw him last night (correct) I see him last night',
        isAnonymous: false,
        user: {
            _id: 1,
            fullName: `John Deo`,
            avatar: `https://media.istockphoto.com/photos/smiling-man-outdoors-in-the-city-picture-id1179420343?k=20&m=1179420343&s=612x612&w=0&h=G2UGMVSzAXGAQs3pFZpvWlHNRAzwPIWIVtSOxZHsEuc=`,
            badge: 'Beginner',
        },
        likes: 118,
        createdAt: '2022-04-02T03:44:23.700Z',
        category: 'language',
        answers: 3,
        views: 12000,
    },
    {
        _id: 1,
        question: `Is this statement, “i see him last night” can be understood as “I saw him last night”?`,
        description:
            'In my local language (Bahasa Indonesia) there are no verb-2 or past tense form as time tracker. So, I often forget to use the past form of verb when speaking english. I saw him last night (correct) I see him last night',
        isAnonymous: true,
        likes: 118,
        createdAt: '2022-04-02T03:44:23.700Z',
        category: 'language',
        tags: ['english', 'nihal'],
        answers: 3,
        views: 12000,
    },
    {
        _id: 1,
        question: `Is this statement, “i see him last night” can be understood as “I saw him last night”?`,
        description:
            'In my local language (Bahasa Indonesia) there are no verb-2 or past tense form as time tracker. So, I often forget to use the past form of verb when speaking english. I saw him last night (correct) I see him last night',
        isAnonymous: false,
        user: {
            _id: 1,
            fullName: `John Deo`,
            avatar: ``,
            badge: 'beginner',
        },
        likes: 118,
        createdAt: '2022-04-02T03:44:23.700Z',
        category: 'language',
        tags: ['english', 'nihal'],
        answers: 3,
        views: 12000,
    },
    {
        _id: 1,
        question: `Is this statement, “i see him last night” can be understood as “I saw him last night”?`,
        description:
            'In my local language (Bahasa Indonesia) there are no verb-2 or past tense form as time tracker. So, I often forget to use the past form of verb when speaking english. I saw him last night (correct) I see him last night',
        isAnonymous: false,
        user: {
            _id: 1,
            fullName: `John Deo`,
            avatar: ``,
            badge: 'beginner',
        },
        likes: 118,
        createdAt: '2022-04-02T03:44:23.700Z',
        category: 'language',
        tags: ['english', 'nihal'],
        answers: 3,
        views: 12000,
    },
    {
        _id: 1,
        question: `Is this statement, “i see him last night” can be understood as “I saw him last night”?`,
        description:
            'In my local language (Bahasa Indonesia) there are no verb-2 or past tense form as time tracker. So, I often forget to use the past form of verb when speaking english. I saw him last night (correct) I see him last night',
        isAnonymous: false,
        user: {
            _id: 1,
            fullName: `John Deo`,
            avatar: ``,
            badge: 'beginner',
        },
        likes: 118,
        createdAt: '2022-04-02T03:44:23.700Z',
        category: 'language',
        tags: ['english', 'nihal'],
        answers: 3,
        views: 12000,
    },
];

export default function Questions() {
    return (
        <div>
            {questions.map((question) => {
                return <SingleQuestion key={question._id} {...question} />;
            })}
        </div>
    );
}
