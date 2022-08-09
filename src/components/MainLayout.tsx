type MainLayoutProps = {
  children: JSX.Element | JSX.Element[] | string;
};

export default function MainLayout({ children }: MainLayoutProps): JSX.Element {
  return (
    <div className="@w(360~):w(100%) h(100vh) pack" id="main">
      {children}
    </div>
  );
}
