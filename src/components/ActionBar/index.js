import styles from './ActionBar.module.scss';
import className from 'classnames/bind';
import Button from '../../components/Button';
import { PhoneIcon, TiktokIcon } from '../../components/Icon';

const cx = className.bind(styles);

function ActionBar() {
    return (
        <div className={cx('action-bar')}>
            <div className={cx('action-container')}>
                <div>
                    <button className={cx('coin')}>
                        <span style={{ marginLeft: 2, paddingRight: 4 }}>
                            <TiktokIcon />
                        </span>
                        Nhận xu
                    </button>
                </div>
                <div>
                    {/* style={{ paddingRight: 4 }} */}
                    <button className={cx('download')} style={{ marginRight: 18 }}>
                        <span style={{ paddingRight: 4 }}>
                            <PhoneIcon />
                        </span>
                        Tải ứng dụ...
                    </button>
                </div>
                <div className={cx('login-action-bar')}>
                    <Button medium>Đăng nhập</Button>
                </div>
            </div>
        </div>
    );
}

export default ActionBar;
