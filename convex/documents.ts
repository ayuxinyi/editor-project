import { ConvexError, v } from 'convex/values';
import { mutation, query } from './_generated/server';
import { paginationOptsValidator } from 'convex/server';

// 定义查询函数，用于获取所有文档数据
export const get = query({
  args: {
    // 分页参数，用于分页查询文档数据
    paginationOpts: paginationOptsValidator
  },
  // 定义查询处理函数，接收Convex上下文参数
  handler: async (ctx, args) => {
    // 查询documents表中的所有文档数据并返回结果集合
    // 使用ctx.db.query()方法查询指定表
    // collect()方法用于获取查询结果的完整集合
    return await ctx.db.query('documents').paginate(args.paginationOpts);
  }
});

// 定义创建文档的mutation函数
export const create = mutation({
  args: {
    title: v.optional(v.string()),
    initialContent: v.optional(v.string())
  },
  handler: async (ctx, args) => {
    // 获取当前登录用户信息，我们已经集成了clerk
    const user = await ctx.auth.getUserIdentity();
    if (!user) {
      throw new ConvexError('未经授权');
    }
    // 插入新文档到documents表中，包含标题、所有者ID和初始内容
    return await ctx.db.insert('documents', {
      title: args.title ?? 'Untitled document',
      ownerId: user.subject,
      initialContent: args.initialContent
    });
  }
});

export const removeById = mutation({
  args: {
    id: v.id('documents')
  },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) {
      throw new ConvexError('未经授权');
    }
    const document = await ctx.db.get(args.id);
    if (!document) {
      throw new ConvexError('文档不存在');
    }
    const isOwner = document.ownerId === user.subject;
    if (!isOwner) {
      throw new ConvexError('没有权限删除文档');
    }
    return await ctx.db.delete(args.id);
  }
});

export const updateById = mutation({
  args: {
    id: v.id('documents'),
    title: v.string()
  },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) {
      throw new ConvexError('未经授权');
    }
    const document = await ctx.db.get(args.id);
    if (!document) {
      throw new ConvexError('文档不存在');
    }
    const isOwner = document.ownerId === user.subject;
    if (!isOwner) {
      throw new ConvexError('没有权限删除文档');
    }
    return await ctx.db.patch(args.id, { title: args.title });
  }
});
