'use client'
import Link from 'next/link'
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function Sidebar({categories,tags,pages}) {

    console.log(categories)

    
  

  return (
    <div className="col-lg-4">

        <div className="card mb-4">
            <div className="card-header">About</div>
            <div className="card-body">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis 
            </div>
        </div>

        <div className="card mb-4">
            <div className="card-header">Search</div>
            <div className="card-body">
                <div className="input-group">
                    <input className="form-control" type="text" placeholder="Enter search term..." aria-label="Enter search term..." aria-describedby="button-search" />
                    <button className="btn btn-primary" id="button-search" type="button">Go!</button>
                </div>
            </div>
        </div>

        <div className="card mb-4">
            <div className="card-header">Categories</div>
            <div className="card-body">
                <div className="row">
                    <div className="col-sm-6">
                        <ul className="list-unstyled mb-0">
                            {categories?.map(cat=>{
                            return (
                            <li key={cat.id}>
                                <Link href={`/category/${cat.title}`} prefetch>
                                {cat.title}
                                </Link>
                            </li>
                            );})}
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <div className="card mb-4">
            <div className="card-header">Tags</div>
            <div className="card-body">
                <div className="row">
                    <div className="col">
                        <ul className="list-unstyled d-flex flex-wrap gap-2">
                            {tags?.map(tag=>{
                                return <li key={tag.id}><Link href={'/tags/'+tag.title} key={tag.id} prefetch={true} >{tag.title}</Link></li>
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <div className="card mb-4">
            <div className="card-header">Pages </div>
            <div className="card-body">
                <div className="row">
                    <div className="col-sm-6">
                        <ul className="list-unstyled mb-0">
                            {pages?.map(page=>{
                                return <li key={page.id}><Link href={'/'+page.slug} key={page.id} prefetch={true} >{page.title}</Link></li>
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )

}