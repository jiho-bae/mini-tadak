import { Link } from 'react-router-dom';

type FormLayoutProps = {
  children: JSX.Element[] | JSX.Element;
  title: string;
  link?: {
    to: string;
    text: string;
  };
  onSubmitForm: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
};

export default function FormLayout({ children, title, link, onSubmitForm }: FormLayoutProps) {
  return (
    <div className="@w(~375):w(150) @w(376~):w(360) h(240)  m(auto/auto) p(15) bg(white) r(10) vbox(center)">
      <h1 className="font(24) bold">{title}</h1>
      <div className="space(60)"></div>
      <form onSubmit={onSubmitForm} className="hbox gap(10)">
        {children}
      </form>
      <div className="space(10)"></div>
      {link && (
        <Link to={link.to} className="c(blue)">
          {link.text}
        </Link>
      )}
    </div>
  );
}
