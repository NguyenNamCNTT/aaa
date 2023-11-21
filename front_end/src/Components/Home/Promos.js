import React from "react";
import { FiUser } from "react-icons/fi";

function Promos() {
  return (
    <div className="my-20 py-10 md:px-20 px-8 bg-dry">
      <div className="lg:grid lg:grid-cols-2 lg:gap-10 items-center">
        <div className="flex lg:gap-10 gap-6 flex-col">
          <h1 className="xl:text-3xl text-xl capitalize font-sans font-medium xl:leading-relaxed">
            Phim Chill
          </h1>
          <p className="text-text text-sm xl:text-base leading-6 xl:leading-8">
            Chào mừng bạn đến với trang web phim hoạt hình tuyệt vời của chúng
            tôi! Nếu bạn yêu thích thế giới phim hoạt hình, hãy chuẩn bị cho một
            cuộc phiêu lưu tuyệt vời ngay tại đây. Trang web của chúng tôi cung
            cấp một thư viện phim hoạt hình đa dạng và phong phú, từ những tác
            phẩm kinh điển đến những bộ phim hoạt hình mới nhất. Bạn sẽ được tận
            hưởng những câu chuyện phép thuật, những nhân vật đáng yêu và hài
            hước, cùng với những thông điệp sâu sắc và giá trị nhân văn. Với
            chất lượng hình ảnh sắc nét và âm thanh sống động, trải nghiệm xem
            phim trên trang web của chúng tôi sẽ mang đến cho bạn niềm vui và
            cảm xúc tuyệt vời. Bạn có thể tìm kiếm và lựa chọn những bộ phim
            hoạt hình mà mình yêu thích, và thậm chí tạo danh sách phim để theo
            dõi.
          </p>
          <div className="flex gap-4 md:text-lg text-sm">
            <div className="flex-colo bg-black text-subMain px-6 py-3 rounded-md font-bold">
              HD 4K
            </div>
            <div className="flex-rows gap-4 bg-black text-subMain px-6 py-3 rounded-md font-bold">
              <FiUser /> 2K
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Promos;
