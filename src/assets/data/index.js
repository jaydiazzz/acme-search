import { calendar } from '@/assets/data/calendar.json';
import { contacts } from '@/assets/data/contacts.json';
import { dropbox } from '@/assets/data/dropbox.json';
import { slack } from '@/assets/data/slack.json';
import { tweet } from '@/assets/data/tweet.json';

export default [
  ...calendar,
  ...contacts,
  ...dropbox,
  ...slack,
  ...tweet,
];
