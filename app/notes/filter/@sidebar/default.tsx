import css from "./SideBarNotes.module.css";

const tags = [
  { value: "Todo", label: "To Do" },
  { value: "Work", label: "Work" },
  { value: "Personal", label: "Personal" },
  { value: "Meeting", label: "Meetings" },
  { value: "Shopping", label: "Shopping List" },
];

export default function SidebarNotes() {
  return (
    <ul className={css.menuList}>
      <li className={css.menuItem}>
        <a href={`/notes/filter/all`} className={css.menuLink}>
          All notes
        </a>
      </li>
      {tags.map(({value, label}) => (
        <li key={value} className={css.menuItem}>
          <a href={`/notes/filter/${value}`} className={css.menuLink}>
            {label}
          </a>
        </li>
      ))}
    </ul>
  );
}