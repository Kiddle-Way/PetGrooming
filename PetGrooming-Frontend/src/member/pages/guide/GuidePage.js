import GuideComponent from "../../components/guide/GuideComponent";
import BasicLayout from "../../../common/layouts/BasicLayout";

const GuidePage = () => {
  return (
    <BasicLayout>
      <div className="m-16 flex-col w-full">
        <div className="flex justify-end mt-1 mb-4 mr-5">
          홈 ＞ <b>미용 안내</b>
        </div>
        <GuideComponent />
      </div>
    </BasicLayout>
  );
};
export default GuidePage;
