import GuideComponent from "../../../admin/components/product/GuideComponent";
import BasicLayout from "../../../common/layouts/BasicLayout";

const GuidePage = () => {
  return (
    <BasicLayout>
      <div className="m-16 flex-col w-full">
        <GuideComponent />
      </div>
    </BasicLayout>
  );
};
export default GuidePage;
