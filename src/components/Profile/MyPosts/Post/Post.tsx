import React, {FC} from 'react';
import s from './Post.module.css'

type PropsType = {
    posts: PostType[]
};

type PostType = {
    id: string
    avatar: string
    message: string
    likes: number
};

export const Post: FC<PropsType> = props => {

    const {posts} = props
    return (
        <div className={s.wrapper}>
            {
                posts.map((p) => {
                    return (
                        <div key={p.id}>
                            <div>{p.message}</div>
                            <span>likes: {p.likes}</span>
                            <div>{p.avatar}</div>
                        </div>
                    )
                })
            }
        </div>
    )
}
