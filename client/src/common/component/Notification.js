/* eslint-disable react/prop-types */
/* eslint-disable no-unused-expressions */
import React, { useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
// MUI
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
// Icons
import NotificationsIcon from '@material-ui/icons/Notifications';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatIcon from '@material-ui/icons/Chat';
// Redux
import { connect } from 'react-redux';
import { markNotificationsRead } from '../../pages/login/reducer';

const Notifications = (props) => {
  const [componentState, setComponentState] = useState({
    anchorEl: null,
  });
  const handleOpen = (event) => {
    setComponentState({ anchorEl: event.target });
  };
  const handleClose = () => {
    setComponentState({ anchorEl: null });
  };
  const onMenuOpened = () => {
    const unreadNotificationsIds = props.notifications
      .filter((notification) => !notification.read)
      .map((notification) => notification.notificationId);
    props.markNotificationsRead(unreadNotificationsIds);
  };
  const { notifications } = props;
  const { anchorEl } = componentState;

  dayjs.extend(relativeTime);

  let notificationsIcon;
  if (notifications && notifications.length > 0) {
    notifications.filter((notification) => notification.read === false).length >
    0
      ? (notificationsIcon = (
          <Badge
            badgeContent={
              notifications.filter(
                (notification) => notification.read === false,
              ).length
            }
            color="secondary"
          >
            <NotificationsIcon />
          </Badge>
        ))
      : (notificationsIcon = <NotificationsIcon />);
  } else {
    notificationsIcon = <NotificationsIcon />;
  }
  const notificationsMarkup =
    notifications && notifications.length > 0 ? (
      notifications.map((notification) => {
        const verb = notification.type === 'like' ? 'liked' : 'commented on';
        const time = dayjs(notification.createdAt).fromNow();
        const iconColor = notification.read ? 'primary' : 'secondary';
        const icon =
          notification.type === 'like' ? (
            <FavoriteIcon color={iconColor} style={{ marginRight: 10 }} />
          ) : (
            <ChatIcon color={iconColor} style={{ marginRight: 10 }} />
          );

        return (
          <MenuItem key={notification.createdAt} onClick={handleClose}>
            {icon}
            <Typography
              component={Link}
              color="default"
              variant="body1"
              to={`/users/${notification.recipient}/puzzlepiece/${notification.puzzlepieceId}`}
            >
              {notification.sender} {verb} your puzzlepiece {time}
            </Typography>
          </MenuItem>
        );
      })
    ) : (
      <MenuItem onClick={handleClose}>You have no notifications yet.</MenuItem>
    );
  return (
    <Fragment key="notification-icon">
      <Tooltip placement="top" title="Notifications">
        <IconButton
          aria-owns={anchorEl ? 'simple-menu' : undefined}
          aria-haspopup="true"
          onClick={handleOpen}
        >
          {notificationsIcon}
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        onEntered={onMenuOpened}
      >
        {notificationsMarkup}
      </Menu>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  notifications: state.user.notifications,
});

export default connect(mapStateToProps, { markNotificationsRead })(
  Notifications,
);
