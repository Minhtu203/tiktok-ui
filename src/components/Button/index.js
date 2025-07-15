import styles from './Button.module.scss';
import classNames from 'classnames/bind';
import React, { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const cx = classNames.bind(styles);

const Button = forwardRef(
    (
        {
            to,
            href,
            primary = false,
            outline = false,
            small = false,
            medium = false,
            large = false,
            disabled,
            children,
            text = false,
            onClick,
            className,
            ...passProps
        },
        ref,
    ) => {
        let Comp = 'button';
        const props = {
            onClick,
            ...passProps,
        };

        if (disabled) {
            delete props.onClick;
        }

        if (to) {
            props.to = to;
            Comp = Link;
        } else if (href) {
            props.href = href;
            Comp = 'a';
        }

        const classes = cx('wrapper', {
            [className]: className,
            primary,
            outline,
            text,
            disabled,
            small,
            medium,
            large,
        });

        return (
            <Comp ref={ref} className={classes} {...props}>
                <span>{children}</span>
            </Comp>
        );
    },
);

Button.propTypes = {
    to: PropTypes.string,
    href: PropTypes.string,
    primary: PropTypes.bool,
    outline: PropTypes.bool,
    small: PropTypes.bool,
    medium: PropTypes.bool,
    large: PropTypes.bool,
    disabled: PropTypes.bool,
    children: PropTypes.node.isRequired,
    text: PropTypes.string,
    onClick: PropTypes.func,
    className: PropTypes.string,
};

export default Button;
