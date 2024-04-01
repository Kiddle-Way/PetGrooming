import ListComponent from "../../components/notice/ListComponent";

const ListPage = () => {
  return (
    <div className="p-4 w-full bg-yellow-200">
      <div className="text-3xl font-extrabold">공지사항 목록 페이지</div>
      <ListComponent />
    </div>
  );
};
export default ListPage;
