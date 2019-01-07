import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const FaqWrapper = styled.article`
  display: flex;
  flex-direction: column;
  padding: 20px;
  background: white;
  h1 {
    font-size: 36px;
    font-weight: bold;
    margin-bottom: 20px;
  }
`;

const FaqSection = styled.section`
  display: flex;
  flex-direction: column;
  padding: 20px;
  h2 {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
  }
  li.strike {
    text-decoration: line-through;
  }
  dt {
    padding-left: 10px;
    margin-bottom: 10px;
    &.lead {
      margin-left: -10px;
      font-weight: bold;
      margin-bottom: 5px;
    }
  }
`;

export default class Faq extends React.PureComponent {
  render() {
    return (
      <FaqWrapper>
        <Link to="/">Back to Chat</Link>
        <h1>FAQs and more</h1>
        <FaqSection>
          <h2>FAQs</h2>
          <dt className="lead" align="left">
            Is it just this chat page?{' '}
          </dt>
          <dt className="">
            - Yup! Well, also login and sign up, but there's a lot{' '}
            <a href="#features">more to come</a>
          </dt>
          <dt className="lead">Is there an app to download? </dt>
          <dt className="">
            - Not yet, we're working on packaging native apps as we're squashing
            bugs, for now the website should work on desktop and mobile browsers
            alike
          </dt>
          <dt className="lead">Are you going to add ______? </dt>
          <dt className="">
            - Possibly, there's a list of features we plan to implement{' '}
            <a href="#features">down below</a>
          </dt>
          <dt className="lead">Can you do ______? </dt>
          <dt className="">
            - Probably, if it's in the <a href="#features">Planned Feature</a>{' '}
            list, we're going to. If not, email your suggestion to{' '}
            <a href="mailto:unbearables.dev@gmail.com">
              unbearables.dev@gmail.com
            </a>
            !
          </dt>
          <dt className="lead">I'd love to help! What can I do? </dt>
          <dt className="">
            - E-mail{' '}
            <a href="mailto:unbearables.dev@gmail.com">
              unbearables.dev@gmail.com
            </a>{' '}
            with a brief intro, list of your skills, and what kind of time you
            think you'll be able to commit, and we'll be in touch!
          </dt>
          <dt className="lead">I'm not tech savvy, can I still help? </dt>
          <dt className="">
            - Sure can! Use the app in every browser on every device you've got,
            and be sure to report issues and unexpected behavior{' '}
            <a href="https://bitbucket.org/theunbearables/unbearablesapp/issues?status=new&amp;status=open">
              here
            </a>
            !
          </dt>
          <dt className="lead">Can I buy the devs a coffee/beer? </dt>
          <dt className="">
            - Shit yea you can! And we'll probably sing your praises in the chat{' '}
            <a href="https://PayPal.Me/unbearabledevs">
              PayPal.Me/unbearabledevs
            </a>
          </dt>
        </FaqSection>
        <FaqSection id="features">
          <h2>Planned Features</h2>
          <ul>
            <li className="strike">Downloadable app for mobile devices</li>
            <li className="strike">Password Reset</li>
            <li className="strike">Active user list in chat</li>
            <li className="strike">Ability to "@" mention people in chat</li>
            <li>Edit profile</li>
            <li className="strike">Push notifications</li>
            <li>BigBear's News Feed</li>
            <li>Monthly donation/subscription to BigBear</li>
            <li>Resource embedding (pasting images)</li>
            <li>Mute other users in chat</li>
            <li>SuperChat/paid messages to BigBear</li>
            <li>Custom bearmojis</li>
            <li>Sounds for messages</li>
            <li className="strike">"Remember me" on login screen</li>
            <li>Bear to Bear private messaging</li>
            <li>Bear Links (UNN, Shops, streams, etc)</li>
            <li>Bear Map</li>
          </ul>
        </FaqSection>
        <FaqSection id="bugs">
          <h2>Known Bugs</h2>
          <ul>
            <li>Words without spaces don't always wrap</li>
          </ul>
        </FaqSection>
        <FaqSection id="credits">
          <h2>Credits</h2>
          <ul>
            <li>CoderBear</li>
            <li>NoxBear</li>
            <li>SproutBear</li>
            <li>DragonBear</li>
            <li>JSBear</li>
            <li>ITBear</li>
            <li>WhiteBear</li>
            <li>JSVikingBear</li>
            <li>JustinBear</li>
            <li>MeowBear</li>
            <li>BearenStenBear</li>
          </ul>
        </FaqSection>
        <FaqSection id="questions">
          <h2>Questions?</h2>
          <div>
            Email us here at{' '}
            <a href="mailtoP:nbearables.dev@gmail.com">
              unbearables.dev@gmail.com
            </a>
          </div>
        </FaqSection>
        <FaqSection id="bugs">
          <h2>Bugs</h2>
          <div>
            got bugs? report{' '}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://bitbucket.org/theunbearables/unbearablesapp/issues?status=new&amp;status=open"
            >
              here
            </a>
          </div>
        </FaqSection>
      </FaqWrapper>
    );
  }
}
