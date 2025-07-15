import { useEffect, useRef, useState } from 'react';
import { Wrapper as PopperWrapper } from '../../Popper';
import axios from 'axios';

import className from 'classnames/bind';
import Tippy from '@tippyjs/react/headless'; // Using headless for full control
import styles from './Sidebar.module.scss';
import images from '../../../assets/imgs';
import 'tippy.js/dist/tippy.css'; // optional
import AccountItem from './AccountItem';
import Button from '../../../components/Button/index';
import {
    CloseIcon,
    CloseIcon2,
    ExploreIcon,
    FollowIcon,
    HomeIcon,
    LiveIcon,
    More,
    Profile,
    SearchIcon,
    UploadIcon,
} from '../../../components/Icon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useDebounce } from '../../../hook/useDebounce';
import { Link } from 'react-router-dom';

const cx = className.bind(styles);

export default function Sidebar() {
    const [searchValue, setSearchValue] = useState('');
    const [showResult, setShowResult] = useState(false);
    const [searchResult, setSearchResult] = useState([]);
    const inputRef = useRef(null);
    const [isClosing, setIsClosing] = useState(false);
    const [loading, setLoading] = useState(false);

    const debounced = useDebounce(searchValue, 400);

    useEffect(() => {
        if (!searchValue.trim()) {
            setSearchResult([]);
            return;
        }
        setLoading(true);

        axios
            .get(`https://tiktok.fullstack.edu.vn/api/users/search`, {
                params: {
                    q: debounced,
                    type: 'less',
                },
            })
            .then((res) => {
                setSearchResult(res.data.data);
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debounced]);

    const handleHideResult = () => {
        setIsClosing(true);
        setTimeout(() => {
            setShowResult(false);
            setIsClosing(false);
        }, 400);
    };

    const handleClear = () => {
        setSearchValue('');
    };

    return (
        <div className={cx('wrapper')}>
            {/* icon */}
            <Link className={cx('logo')} to={'/'}>
                <img src={images.logo} alt="Tiktok" />
            </Link>
            {/* search container */}
            <div>
                <Tippy
                    interactive
                    placement="right-end"
                    visible={showResult}
                    onClickOutside={handleHideResult}
                    render={(attrs) => (
                        <>
                            {showResult && (
                                <div className={cx('search-result', { hide: isClosing })} tabIndex="-1" {...attrs}>
                                    <PopperWrapper>
                                        <h1>
                                            Search
                                            <button className={cx('close-icon2')} onClick={handleHideResult}>
                                                <CloseIcon2 />
                                            </button>
                                        </h1>
                                        {/* input search */}
                                        <div className={cx('search-input-wrapper')}>
                                            <input
                                                className={cx('search-input')}
                                                ref={inputRef}
                                                value={searchValue}
                                                spellCheck={false}
                                                placeholder="Tìm kiếm"
                                                onChange={(e) => setSearchValue(e.target.value)}
                                            />
                                            {!!searchValue && !loading && (
                                                <button
                                                    className={cx('clear')}
                                                    onClick={() => {
                                                        handleClear();
                                                        inputRef.current.focus();
                                                    }}
                                                >
                                                    <CloseIcon />
                                                </button>
                                            )}

                                            {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}
                                        </div>
                                        <h2 className={cx('search-title')}>Account</h2>
                                        {searchResult.map((result) => (
                                            <AccountItem key={result.id} data={result} />
                                        ))}
                                    </PopperWrapper>
                                </div>
                            )}
                        </>
                    )}
                >
                    <div className={cx('search')}>
                        <button
                            className={cx('search-btn')}
                            onClick={() => {
                                setShowResult(!showResult);
                                setTimeout(() => {
                                    inputRef.current?.focus();
                                }, 0);
                            }}
                        >
                            <span style={{ marginRight: 9, marginLeft: 4, display: 'flex', position: 'relative' }}>
                                <SearchIcon />
                            </span>
                            Search
                        </button>
                    </div>
                </Tippy>
            </div>

            <div className={cx('sidebar-list')} style={{ marginTop: 16 }}>
                <div className={cx('sidebar-list-btn')}>
                    <Button href={'/'}>
                        <HomeIcon />
                        <div className={cx('sidebar-list-content')} style={{ color: 'var(--primary)' }}>
                            For You
                        </div>
                    </Button>
                </div>

                <div className={cx('sidebar-list-btn')}>
                    <Button href={'/explore'}>
                        <ExploreIcon />
                        <div className={cx('sidebar-list-content')}>Explore</div>
                    </Button>
                </div>

                <div className={cx('sidebar-list-btn')}>
                    <Button href={'/following'}>
                        <FollowIcon />
                        <div className={cx('sidebar-list-content')} style={{ marginLeft: 20 }}>
                            Following
                        </div>
                    </Button>
                </div>

                <div className={cx('sidebar-list-btn')}>
                    <Button href={'/upload'}>
                        <UploadIcon />
                        <div className={cx('sidebar-list-content')} style={{ marginLeft: 21 }}>
                            Upload
                        </div>
                    </Button>
                </div>
                <div className={cx('sidebar-list-btn')}>
                    <Button href={'/live'}>
                        <LiveIcon />
                        <div className={cx('sidebar-list-content')}>LIVE</div>
                    </Button>
                </div>
                <div className={cx('sidebar-list-btn')}>
                    <Button href={'/profile'}>
                        <Profile />
                        <div className={cx('sidebar-list-content')} style={{ marginLeft: 20 }}>
                            Profile
                        </div>
                    </Button>
                </div>
                <div className={cx('sidebar-list-btn')} style={{ marginBottom: 18 }}>
                    <Button href={'/more'}>
                        <More />
                        <div className={cx('sidebar-list-content')} style={{ marginLeft: 21 }}>
                            More
                        </div>
                    </Button>
                </div>
            </div>

            <Button large>Đăng nhập</Button>

            {/* sidebar-list */}
        </div>
    );
}
