import React from 'react';

import {
  FaFacebookSquare,
  FaTwitterSquare,
  FaPinterestSquare,
  FaLinkedin,
} from 'react-icons/fa';
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  PinterestShareButton,
} from 'react-share';

const ShareButtons = ({ url, title, description, link }) => (
  <div className='post-meta-share-icons'>
    <FacebookShareButton url={url} quote={description}>
      <FaFacebookSquare className='social-icon' />
    </FacebookShareButton>

    <TwitterShareButton url={url} title={title}>
      <FaTwitterSquare className='social-icon' />
    </TwitterShareButton>

    <PinterestShareButton url={url} media={link} description={description}>
      <FaPinterestSquare className='social-icon' />
    </PinterestShareButton>

    <LinkedinShareButton url={url} title={title} summary={description}>
      <FaLinkedin className='social-icon' />
    </LinkedinShareButton>
  </div>
);

export default ShareButtons;
