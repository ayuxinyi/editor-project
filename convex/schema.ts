import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

// 定义整个应用的数据库模式（schema）
export default defineSchema({
  // 定义documents表，用于存储文档数据
  documents: defineTable({
    // title字段：存储文档标题，类型为字符串
    title: v.string(),
    // initialContent字段：存储文档初始内容，可选字段，类型为字符串
    initialContent: v.optional(v.string()),
    // ownerId字段：存储文档所有者ID，类型为字符串
    ownerId: v.string(),
    // roomId字段：存储文档所属房间ID，用于完成文档协作，可选字段，类型为字符串
    roomId: v.optional(v.string()),
    // organizationId字段：存储文档所属组织ID，用于完成文档协作，可选字段，类型为字符串
    organizationId: v.optional(v.string())
  })
    // 定义索引，用于根据ownerId查询文档
    .index('by_owner_id', ['ownerId'])
    // 定义索引，用于根据organizationId查询文档
    .index('by_organization_id', ['organizationId'])
    // 定义搜索索引，用于根据title字段搜索文档
    .searchIndex('search_title', {
      searchField: 'title', // 搜索字段为title
      // 搜索时根据ownerId和organizationId过滤，我们不会对其他人的文档进行搜索
      filterFields: ['ownerId', 'organizationId']
    })
});
