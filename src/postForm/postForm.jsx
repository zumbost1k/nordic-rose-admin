import React, { useState } from 'react';
import {
  HtmlEditor,
  Inject,
  QuickToolbar,
  RichTextEditorComponent,
  Toolbar,
} from '@syncfusion/ej2-react-richtexteditor';
import '@syncfusion/ej2-base/styles/bootstrap5.css';
import '@syncfusion/ej2-icons/styles/bootstrap5.css';
import '@syncfusion/ej2-buttons/styles/bootstrap5.css';
import '@syncfusion/ej2-splitbuttons/styles/bootstrap5.css';
import '@syncfusion/ej2-inputs/styles/bootstrap5.css';
import '@syncfusion/ej2-lists/styles/bootstrap5.css';
import '@syncfusion/ej2-navigations/styles/bootstrap5.css';
import '@syncfusion/ej2-popups/styles/bootstrap5.css';
import '@syncfusion/ej2-richtexteditor/styles/bootstrap5.css';

const PostForm = () => {
  const [postHeader, setPostHeader] = useState('');
  const [postText, setPostText] = useState('');
  const [tags, setTags] = useState([]);
  const [tagsText, setTagsText] = useState('');
  const [postPhoto, setPostPhoto] = useState(null);

  const createPostHandle = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('text', postText);
    formData.append('tags', JSON.stringify(tags));
    formData.append('header', postHeader);
    formData.append('img', postPhoto);
    fetch('https://nordic-rose-server.vercel.app/api/post/', {
      method: 'POST',
      body: formData,
    }).then((response) => {
      if (response.ok) {
        setPostText('');
        setPostHeader('');
        setPostPhoto(null);
        setTags([]);
      }
    });
  };
  return (
    <form
      onSubmit={createPostHandle}
      className='border border-dark mx-auto my-4 rounded-2 w-25'
      style={{ minWidth: '500px' }}
    >
      <div className='form-group p-5 d-flex flex-column gap-5'>
        <div>
          <label htmlFor='header' className='fs-4'>
            post header
          </label>
          <input
            required
            value={postHeader}
            onChange={(e) => {
              setPostHeader(e.target.value);
            }}
            type='text'
            className='form-control m-1'
            id='header'
          />
        </div>
        <div>
          <RichTextEditorComponent change={(e) => setPostText(e.value)}>
            <Inject services={[Toolbar, HtmlEditor, QuickToolbar]} />
          </RichTextEditorComponent>
        </div>
        <div className='mb-3'>
          <label htmlFor='formFile' className='form-label'>
            photo
          </label>
          <input
            required
            onChange={(e) => {
              setPostPhoto(e.target.files[0]);
            }}
            className='form-control'
            type='file'
            id='formFile'
          />
        </div>
        <div>
          <label htmlFor='tag-text' className='fs-4'>
            post tag
          </label>
          <div className='d-flex text-nowrap align-items-center mt-2'>
            <input
              value={tagsText}
              onChange={(e) => {
                setTagsText(e.target.value);
              }}
              type='tag-text'
              className='form-control'
              id='text'
            />
            <button
              className='btn btn-secondary'
              type='button'
              onClick={() => {
                if (!!tagsText.length) {
                  setTags(tags.concat(tagsText));
                  setTagsText('');
                }
              }}
            >
              add tag
            </button>
          </div>

          <div className='d-flex flex-column mt-3'>
            <h3 className='fs-4'>tags</h3>
            <div className='d-flex gap-2'>
              {tags.map((currentTag, index) => {
                return (
                  <button
                    onClick={() => {
                      const splicedTags = tags.slice(0);
                      splicedTags.splice(index, 1);
                      setTags(splicedTags);
                    }}
                    type='button'
                    className=' btn btn-danger text-center'
                  >
                    {currentTag}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className='d-flex align-items-center'>
        <button
          type='submit'
          className='btn btn-success my-3 mx-auto py-2 px-4 fs-4'
        >
          create post
        </button>
      </div>
    </form>
  );
};

export default PostForm;
