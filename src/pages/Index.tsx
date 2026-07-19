import { css, Global } from '@emotion/core';
import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { Header } from '../components';
import { Homepage } from '@/components/shared/homepage';
import { FC } from '../interfaces';
import { useTitle } from '../hooks';
import { api } from '../apis';
/** 首页的属性接口 */
interface IndexProps {}
/**
 * 首页
 */
export const IndexPage: FC<IndexProps> = () => {
  const { formatMessage } = useIntl(); // i18n
  useTitle({ suffix: formatMessage({ id: 'site.slogan' }) }); // 设置标题
  const [homepageHtml, setHomepageHtml] = useState<string>();
  const [homepageCss, setHomepageCss] = useState<string>();

  useEffect(() => {
    api.siteSetting
      .getHomepage({})
      .then((res) => {
        setHomepageHtml(res.data.html);
        setHomepageCss(res.data.css);
      })
      .catch((err) => {
        setHomepageHtml('');
        setHomepageCss('');
      });
  }, []);
  return (<div
    css={css`
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: stretch;
      align-items: stretch;
      .Index__Title {
        flex: auto;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          max-height: 300px;
        }
      }
      .Index__Footer {
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        text-align: center;
        .tipBox {
          background: rgba(250, 173, 20, .5);
          width: 96%;
          margin: 0 auto;
          border-radius: 6px 6px 0 0;
          padding: 4px;
        }
        code {
          color: #FF657C;
        }
        p {
          margin: 0;
          padding: 0;
          font-size: 16px;
          line-height: 1.5em;
        }
      }
    `}
  >
    <Global
      styles={css`
        #root {
          width: 100%;
          height: 100%;
        }
      `}
    />
    <Header />
    <div className="Index__Title">
      <Homepage html={homepageHtml} styles={homepageCss} />
    </div>
    <div className="Index__Footer">
      <div className="tipBox">
          <p>本站反馈群 <code>451050931</code>。合购版本问题请在群内私聊群主，保持定期联系是支持我们继续运营的重要方式。</p>
        </div>
    </div>
  </div>)
};

