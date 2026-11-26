export default function PolicyPage({ title, items }: { title:string; items:[string,string,string][] }) {
  return (
    <main className="policy-page">
      <p className="eyebrow">BARKO INFORMATION</p>
      <h1>{title}</h1>
      <div className="policy-list">{items.map(([heading, first, second]) => <section key={heading}><h2>{heading}</h2><p>{first}</p><p>{second}</p></section>)}</div>
    </main>
  );
}
