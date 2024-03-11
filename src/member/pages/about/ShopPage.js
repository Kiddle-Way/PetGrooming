import ShopLayout from "../../../common/layouts/ShopLayout";
import AboutMap from "../../components/about/AboutMap";

const ShopPage = () => {
  return (
    <div>
      <ShopLayout>
        {/* 지도를 표시할 div */}
        <div>오시는길</div>
        <div>
          <AboutMap />
        </div>
      </ShopLayout>
    </div>
  );
};

export default ShopPage;
