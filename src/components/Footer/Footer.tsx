import React from 'react';

import { WrapperFooter, LogoRSS, TeamMates, Year, ContentFooter } from './Footer.styled';
import { LINK_TO_RSS, TEAM_MATES } from 'appConstants';

export const Footer = () => {
  return (
    <WrapperFooter>
      <ContentFooter>
        <LogoRSS href={LINK_TO_RSS} target="_blank" />
        <TeamMates>
          {TEAM_MATES.map((item, index) => {
            return (
              <a key={index} href={item.link} target="_blank" rel="noreferrer">
                {item.name}
              </a>
            );
          })}
        </TeamMates>
        <Year>2022 ©</Year>
      </ContentFooter>
    </WrapperFooter>
  );
};
