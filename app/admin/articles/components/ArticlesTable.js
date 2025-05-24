"use client"

import Link from "next/link"

export default function ArticlesTable({articles}) {
    console.log(articles)
    if(!articles)
    {
        return <div className="error">Failled to load articles from server</div>
    }

      return (
        <table>
        <thead>
          <tr>
            <th><input type="checkbox" /></th>
            <th>Title</th>
            <th>Author</th>
            <th>Categories</th>
            <th>Tags</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {articles.map(article=>{
            return (
            <tr key={article.id}>
            <td><input type="checkbox" /></td>
            <td>
              <a href="#" class="post-title">{article.title}</a>
              <div class="row-actions">
                <span><a href="#">Edit</a></span>
                <span><a href="#">Quick Edit</a></span>
                <span><a href="#">Trash</a></span>
                <span><Link href={'/article/' + article.slug}>View</Link></span>
              </div>
            </td>
            <td>admin</td>
            <td>{article.category.title}</td>
            <td>{article.tags.map(tag=>tag.title + ',')}</td>
            <td>Published<br />
            <small>{
    (() => {
      const d = new Date(article.created_at);
      const yyyy = d.getFullYear();
      const mm = String(d.getMonth() + 1).padStart(2, '0');
      const dd = String(d.getDate()).padStart(2, '0');
      let h = d.getHours() % 12 || 12;
      const min = String(d.getMinutes()).padStart(2, '0');
      const ampm = d.getHours() >= 12 ? 'PM' : 'AM';
      return `${yyyy}/${mm}/${dd} at ${h}:${min} ${ampm}`;
    })()
  }</small>
            </td>
          </tr>
            )
          })}
        </tbody>
      </table>
      );
    }
    



    
