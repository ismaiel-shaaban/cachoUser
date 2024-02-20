import React from 'react'
import styles from './CategoryModule.module.css'
import images from 'src/Assets/images'
import Image from 'next/image'

function CategoryModule() {
    return (
        <>
           <div className={styles.upperHeadr}>
           <div className={styles.customUpper}>
                <em className={styles.leftarrowBlack}>
                    <Image src={images.leftarrowBlack} alt="leftarrowBlack" />
                </em>
                <span className={styles.headText}>All Categories</span>
            </div>
           </div>
           <div className={styles.allCategories}>
            <figure  className={`${styles.featuredCatRow} relative rounded-[10px] overflow-hidden`}>
                <em className="relative w-[240px] h-[140px]">
                    <Image src={images.womenPic} alt='womenPic'  />
                </em>
                <small className={styles.smallText}>Women</small>
            </figure>
            <figure className={`${styles.featuredCatRow} relative rounded-[10px] overflow-hidden`}>
                <em className=' relative w-[240px] h-[140px]'>
                    <Image src={images.menPic} />
                </em>
                <small className={styles.smallText}>Men</small>
            </figure>
            <figure className={`${styles.featuredCatRow} relative rounded-[10px] overflow-hidden`}>
                <em className=' relative w-[240px] h-[140px]'>
                    <Image src={images.womenPic} />
                </em>
                <small className={styles.smallText}>Women</small>
            </figure>
            <figure  className={`${styles.featuredCatRow} relative rounded-[10px] overflow-hidden`}>
                <em className="relative w-[240px] h-[140px]">
                    <Image src={images.womenPic} alt='womenPic'  />
                </em>
                <small className={styles.smallText}>Women</small>
            </figure>
            <figure className={`${styles.featuredCatRow} relative rounded-[10px] overflow-hidden`}>
                <em className=' relative w-[240px] h-[140px]'>
                    <Image src={images.menPic} />
                </em>
                <small className={styles.smallText}>Men</small>
            </figure>
            <figure  className={`${styles.featuredCatRow} relative rounded-[10px] overflow-hidden`}>
                <em className="relative w-[240px] h-[140px]">
                    <Image src={images.womenPic} alt='womenPic'  />
                </em>
                <small className={styles.smallText}>Women</small>
            </figure>
            <figure className={`${styles.featuredCatRow} relative rounded-[10px] overflow-hidden`}>
                <em className=' relative w-[240px] h-[140px]'>
                    <Image src={images.menPic} />
                </em>
                <small className={styles.smallText}>Men</small>
            </figure>
            <figure  className={`${styles.featuredCatRow} relative rounded-[10px] overflow-hidden`}>
                <em className="relative w-[240px] h-[140px]">
                    <Image src={images.womenPic} alt='womenPic'  />
                </em>
                <small className={styles.smallText}>Women</small>
            </figure>
            <figure className={`${styles.featuredCatRow} relative rounded-[10px] overflow-hidden`}>
                <em className=' relative w-[240px] h-[140px]'>
                    <Image src={images.menPic} />
                </em>
                <small className={styles.smallText}>Men</small>
            </figure>
           </div>
        </> 
    )
}

export default CategoryModule