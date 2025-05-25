export function editorJsToHtml(editorData) {
    if (!editorData) return 'no data received from the server';
  
    let jsonContent;
    if (typeof editorData === 'string') {
      try {
        jsonContent = JSON.parse(editorData);
      } catch (e) {
        console.error('Invalid JSON string', e);
        return '';
      }
    } else if (typeof editorData === 'object') {
      jsonContent = editorData;
    } else {
      return '';
    }
  
    let html = '';
  
    jsonContent.blocks.forEach(block => {
      switch (block.type) {
        case 'header':
          html += `<h${block.data.level}>${block.data.text}</h${block.data.level}>`;
          break;
  
        case 'paragraph':
          html += `<p>${block.data.text}</p>`;
          break;
  
        case 'list':
          if (block.data.style === 'unordered') {
            html += '<ul>';
            block.data.items.forEach(item => {
              html += `<li>${item.content}</li>`; // Use item.content because items are objects
            });
            html += '</ul>';
          } else {
            html += '<ol>';
            block.data.items.forEach(item => {
              html += `<li>${item.content}</li>`;
            });
            html += '</ol>';
          }
          break;
  
        case 'image':
          html += `<img src="${block.data.file.url}" alt="${block.data.caption || ''}" />`;
          if (block.data.caption) {
            html += `<figcaption>${block.data.caption}</figcaption>`;
          }
          break;
  
        case 'quote':
          html += `<blockquote>${block.data.text}</blockquote>`;
          if (block.data.caption) {
            html += `<cite>${block.data.caption}</cite>`;
          }
          break;
  
        case 'embed':
          html += `<iframe src="${block.data.url}" frameborder="0" allowfullscreen></iframe>`;
          break;
  
        case 'table':
          html += '<table>';
          block.data.content.forEach(row => {
            html += '<tr>';
            row.forEach(cell => {
              html += `<td>${cell}</td>`;
            });
            html += '</tr>';
          });
          html += '</table>';
          break;
  
        case 'delimiter':
          html += '<hr />';
          break;
  
        case 'linkTool':
          html += `<a href="${block.data.link}" target="_blank" rel="noopener noreferrer">${block.data.link}</a>`;
          break;
  
        case 'warning':
          html += `<div class="warning"><strong>${block.data.title}</strong><p>${block.data.message}</p></div>`;
          break;
  
        case 'checklist':
          html += '<ul>';
          block.data.items.forEach(item => {
            const checked = item.checked ? 'checked' : '';
            html += `<li class="${checked}">${item.text}</li>`;
          });
          html += '</ul>';
          break;
  
        default:
          console.log(`Unknown block type: ${block.type}`);
          break;
      }
    });
  
    return html;
  }
  