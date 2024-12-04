import styles from './EstateList.module.scss';
import { url } from 'lib/axios';
import { Modal } from 'antd';
import EstateDetail from '../estateDetail/EstateDetail';
import { useState } from 'react';
import { formatEstateType, formatPrice } from 'utils/utils';
import useInfiniteScroll from 'hook/useInfiniteScroll';

const EstateList = ({ estateList, hasMore, totalPages, page, setPage }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [estateDetail, setEstateDetail] = useState({});

  const onToggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  const onClickModal = (estateNum) => () => {
    onToggleModal();

    const modalItem = estateList.find((estate) => {
      if (estate.estateNum === estateNum) return estate;
    });
    setEstateDetail(modalItem);
  };

  const elementRef = useInfiniteScroll(async (entry, observer) => {
    if (hasMore && totalPages !== page) {
      setPage((prev) => prev + 1);
    }
  });

  return (
    <>
      <ul className={styles.listWrapper}>
        {estateList.map((estate) => (
          <li key={estate.estateNum} onClick={onClickModal(estate.estateNum)}>
            <div className={styles.imgWrapper}>
              <img
                src={`${url}/estateImage/${estate.estateImageNums?.split(',')[0] || ''}`}
                alt="리스트 이미지"
              />
            </div>
            <div className={styles.textWrapper}>
              <p>{formatEstateType(estate.type)}</p>
              <p className={styles.price}>
                {formatPrice({
                  jeonsePrice: estate.jeonsePrice,
                  monthlyPrice: estate.monthlyPrice,
                  depositPrice: estate.depositPrice,
                  buyPrice: estate.buyPrice,
                })}
              </p>
              <p>{estate.address1 + ' ' + estate.address2}</p>
              <p>{estate.title}</p>
            </div>
          </li>
        ))}
        {isModalOpen && (
          <Modal
            open={isModalOpen}
            onCancel={onToggleModal}
            width={857}
            footer={null}
            className={styles.customModal}
          >
            <EstateDetail
              estateImageNums={estateDetail.estateImageNums}
              estateNum={estateDetail.estateNum}
            />
          </Modal>
        )}
      </ul>
      {hasMore && <div ref={elementRef}></div>}
    </>
  );
};

export default EstateList;
