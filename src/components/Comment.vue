<script  lang="ts" setup>
import { Avatar } from 'xiaui';
import { Abuse, Report } from 'xiaui';
import Reply from "./Reply.vue"

const content = `记得这个梗没火之前，虽然坤坤的路人缘不是很好，但真的不会有人无缘无故对这个大男孩怀有恶意，现在几乎所有路人都在玩这个梗，你们玩梗是自己乐呵了，但这对于真正喜欢蔡徐坤的粉丝而言，就是一把扎在心上的刀。
作为一名ikun真的已经麻木了 ，解释没有用， 你去反驳得到的只会是一堆表情包。
但我还是想说一下，不爱，但请不要伤害，不爱也请不要诋毁。蔡徐坤他没惹你们任何人，没做错任何事，他只是一个单纯的大男孩。你们这样恶劣地对待无睾的人，会遭报应的！`;
</script>

<template>
  <div class="comment">
    <Avatar link="https://api.multiavatar.com/f2d85385.png" class="c-avatar"></Avatar>
    <div class="c-main">
      <div class="c-hd">
        <div class="username">{{ '甜心森' }}</div>
      </div>
      <div class="c-bd">{{ content }}</div>
      <div class="c-ft">
        <div class="time">{{ '2022-11-15 22:23' }}</div>
        <div class="action"><i class="iconfont icon-like1"></i><span>123</span></div>
        <div class="action"><i class="iconfont icon-reply"></i></div>
        <Abuse class="abuse">
          <Report text="拉黑" action=""></Report>
          <Report text="举报" action=""></Report>
        </Abuse>
      </div>

      <div class="replies">
        <Reply></Reply>
        <Reply></Reply>
      </div>
    </div>
  </div>

</template>


<style lang="scss" scoped>
.comment {
  display: flex;
  font-size: 14px;
  padding: 16px 16px 16px 0;

  .c-avatar {
    flex-shrink: 0;
    margin-right: 16px;
  }

  .c-main {
    .c-hd {
      .username {
        color: var(--fg-helper);
      }
    }

    .c-bd {
      margin: 8px 0;
    }
  }

  .c-ft {
    display: flex;
    align-items: center;

    .time {
      font-size: 12px;
      color: var(--fg-base3);
      margin-right: 16px;
    }

    .action {
      margin-right: 28px;

      .iconfont {
        margin-right: 8px;
        cursor: pointer;

        &:hover {
          color: var(--fg-primary);
        }
      }
    }

    .abuse {
      z-index: 2;
    }
  }
}
</style>