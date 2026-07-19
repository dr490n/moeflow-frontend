import { FC } from '../../interfaces';
import { Spin } from 'antd';
import brandJump from '../../images/brand/mascot-mhfan.png';
import { css, Global } from '@emotion/core';
/** 属性接口 */
interface HomepageProps {
  html?: string;
  styles?: string;
}

export const Homepage: FC<HomepageProps> = ({ html, styles }) => {
  return html === undefined ? (
    <div
      css={css`
        width: 100vw;
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      `}
    >
      <Spin />
    </div>
  ) : html === '' ? (
    <img src={brandJump} alt="Mascot" />
  ) : (
    <>
      <Global
        styles={css`
          ${styles}
        `}
      />
      <div
        id="homepage"
        className="Index_Homepage"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </>
  );
}