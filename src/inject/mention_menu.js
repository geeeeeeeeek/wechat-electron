/**
 * Created by Zhongyi on 4/9/16.
 */

"use strict";
const Common = require("../common");
const pinyin = require("pinyin");

class MentionMenu {

  static init() {
    let $box = $('<div id="userSelectionBox"/>');

    let $div = $('<div/>');
    $div.html(Common.MENTION_MENU_HINT_TEXT);
    $div.addClass('user_select_hint_text');
    $box.append($div);

    let $select = $('<select multiple/>');
    $select.change(()=> {
      let $editArea = $('#editArea');
      $editArea.focus();
      let newMessage = $editArea.html().replace(/@\S*$/ig, `@${$select.val()} `);
      $editArea.html('');
      $editArea.scope().insertToEditArea(newMessage);
      $box.css('display', 'none');
    });
    $box.append($select);
    $('body').append($box);
    MentionMenu.hideMenuWhenBlur();
  }



  static inject($event) {
    const $editArea = $($event.currentTarget);
    const $box = $('#userSelectionBox');

    if($box.css('display') != 'none' && /^(40|38|32|27)$/.test($event.keyCode)){

      MentionMenu.nevigateMenu($event,$box);
      return;
    }

    let $probe = $('<span id="probe"/>');
    $editArea.append($probe);
    let probePosition = $probe.position();
    $probe.remove();
    let menuPosition = MentionMenu.getMenuPosition($editArea, probePosition);

    let delayInjection = () => {
      const name = /@(\S*)$/.exec($editArea.html());
      if (!name) {
        $box.css('display', 'none');
        return;
      }
      const $scope = angular.element('#chatArea').scope();
      const $select = $box.children('select');
      $select.html('');
      $scope.currentContact.MemberList.map(m => {
        if (!MentionMenu.isValidNameHint(name, m.NickName)) return;

        let $option = MentionMenu.generateOptionFromMember($scope, m);
        if ($option) $select.append($option);
      });
      let membersCount = Math.min($select.children().length, Common.MENTION_MENU_OPTION_DEFAULT_NUM);
      if (membersCount > 0) {
        $select.val('');
        $box.css({
          'display': 'block',
          'height': `${(membersCount + 1) * Common.MENTION_MENU_OPTION_HEIGHT}px`
        });
        if (name[1].length == 0) {
          $box.css({
            'left': `${menuPosition.left}px`,
            'bottom': `${menuPosition.bottom}px`
          });
        }
        $select.css({
          'height': `${membersCount * Common.MENTION_MENU_OPTION_HEIGHT}px`
        });
        $box.focus();
      } else {
        $box.css('display', 'none');
      }
    };
    setTimeout(delayInjection, 0);
  }

  static getMenuPosition($editArea, probePosition) {
    let menuPosition = {};
    let mentionMenuRightBoundX = probePosition.left + Common.MENTION_MENU_WIDTH + Common.MENTION_MENU_OFFSET_X;

    if (!probePosition.left) {
      menuPosition.left = Common.MENTION_MENU_INITIAL_X + Common.MENTION_MENU_OFFSET_X;
    } else if (mentionMenuRightBoundX > $editArea.width()) {
      menuPosition.left = Common.MENTION_MENU_INITIAL_X + $editArea.width() - Common.MENTION_MENU_WIDTH;
    } else {
      menuPosition.left = probePosition.left + Common.MENTION_MENU_INITIAL_X;
    }
    menuPosition.bottom = Common.MENTION_MENU_INITIAL_Y - probePosition.top + Common.MENTION_MENU_OFFSET_Y;
    return menuPosition;
  }

  static isValidNameHint(nameHint, userName) {
    let pinyinRaw = pinyin(userName, {
      style: pinyin.STYLE_FIRST_LETTER
    });

    let pinyinName = '';
    for (let pinyin of pinyinRaw) {
      if (pinyin[0] && pinyin[0] != ' ') {
        pinyinName += pinyin[0];
      }
    }

    const nameRe = new RegExp(nameHint[1], 'ig');
    return nameRe.test(userName) || nameRe.test(pinyinName);
  }

  static generateOptionFromMember($scope, member) {
    let displayName = `${member.NickName}　`;
    let actualName = displayName;

    if (member.DisplayName.length > 0) {
      actualName = member.DisplayName;
    } else {
      let userContact = $scope.getUserContact(member.UserName);
      if (!userContact) return null;
      if (userContact.NickName.length > 0) {
        actualName = userContact.NickName;
      }
    }

    let $option = $(`<option/>`);
    $option.val(actualName);
    $option.html(displayName);

    return $option;
  }

  static hideMenuWhenBlur() {

    $('#editArea').scope()['editAreaBlur'] = function() {
      var oriFun = $('#editArea').scope()['editAreaBlur'];
      return ($event) => {

        oriFun.apply(this, $event);
        if ($('#userSelectionBox').css('display') != 'none' && !$('#userSelectionBox').is(":hover")) {
          $('#userSelectionBox').hide();
        }
      }
    }()
  }

  static nevigateMenu($event, $box) {
    switch ($event.keyCode) {

      case 32:
        if ($($box.find('.hovered')).length || $($box.find('option:hover')).length) {
          var val = $($box.find('.hovered')).length ? $($box.find('.hovered')).val() : $($('#userSelectionBox').find('option:hover')).val();
          $('#userSelectionBox > select').val(val).trigger('change');
        }
        break;

      case 40:
        $event.preventDefault();
        var $currenSelc = $box.find('.hovered');
        $currenSelc.removeClass('hovered');
        if ($currenSelc.next().length) {
          $currenSelc.next().addClass('hovered');
        } else {
          $($box.find('option')[0]).addClass('hovered');
        }
        break;

      case 38:
        $event.preventDefault();
        var $currenSelc = $box.find('.hovered');
        $currenSelc.removeClass('hovered');
        if ($currenSelc.prev().length) {
          $currenSelc.prev().addClass('hovered');
        } else {
          $box.find('option').last().addClass('hovered');
        }
        break;

      case 27:
        $box.hide();
        $('#userSelectionBox > select').val('');
        break;
    }
  }
}

module.exports = MentionMenu;