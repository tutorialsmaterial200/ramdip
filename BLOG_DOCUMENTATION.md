# Blog Feature Documentation

## Overview

A complete blog management system has been integrated into the CPN (Maoist Center) political portfolio website. This includes both public-facing blog pages and a secure admin panel for managing blog posts.

## Features

### Public-Facing Features
- **Blog List Page** (`/blog`) - Browse all published blog posts
- **Individual Blog Post** (`/blog/[id]`) - Read full blog post with metadata
- **Category Filtering** - Filter posts by category (News, Article, Press Release, Update)
- **View Counter** - Track post views automatically
- **Search & Pagination** - Find posts easily
- **Featured Posts** - Highlight important posts
- **Tags & Metadata** - Organize content with tags and author info
- **Share Options** - Social media sharing buttons

### Admin Panel Features
- **Blog Management** (`/admin/blog`) - Complete CRUD operations
- **Create Posts** - Write new blog posts with rich content support
- **Edit Posts** - Modify existing posts
- **Delete Posts** - Remove posts from the site
- **Draft/Publish** - Save as draft or publish immediately
- **Category Management** - Organize posts by category
- **Featured Posts** - Mark posts as featured
- **View Statistics** - See how many times each post has been viewed

## Blog Post Model

```typescript
interface IBlogPost {
  title: string;           // Post title
  slug: string;           // URL-friendly identifier (unique)
  excerpt: string;        // Short summary
  content: string;        // Full post content (HTML supported)
  author: string;         // Author name
  category: "news" | "article" | "press-release" | "update";
  featured: boolean;      // Featured post flag
  image?: string;         // Featured image URL
  tags: string[];         // Post tags
  views: number;          // View count
  published: boolean;     // Publication status
  createdAt: Date;        // Creation timestamp
  updatedAt: Date;        // Last update timestamp
}
```

## API Endpoints

### Blog Posts

#### Get All Posts
```http
GET /api/blog?page=1&limit=10&category=news&featured=true
```

**Query Parameters:**
- `page` (optional) - Page number (default: 1)
- `limit` (optional) - Posts per page (default: 10)
- `category` (optional) - Filter by category (news|article|press-release|update)
- `featured` (optional) - Show only featured posts (true|false)

**Response:**
```json
{
  "success": true,
  "posts": [
    {
      "_id": "ObjectId",
      "title": "Post Title",
      "slug": "post-title",
      "excerpt": "...",
      "author": "CPN (Maoist Center)",
      "category": "news",
      "featured": true,
      "views": 120,
      "published": true,
      "createdAt": "2025-11-30T10:00:00Z",
      ...
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 50,
    "pages": 5
  }
}
```

#### Create Post
```http
POST /api/blog
Content-Type: application/json

{
  "title": "New Blog Post",
  "slug": "new-blog-post",
  "excerpt": "A brief summary",
  "content": "<h2>Post Content</h2><p>Full HTML content here</p>",
  "author": "CPN (Maoist Center)",
  "category": "article",
  "featured": false,
  "image": "https://example.com/image.jpg",
  "tags": ["tag1", "tag2"],
  "published": false
}
```

#### Get Single Post
```http
GET /api/blog/[id]
```

**Note:** This endpoint automatically increments the view count.

**Response:**
```json
{
  "success": true,
  "post": {
    "_id": "ObjectId",
    "title": "Post Title",
    "slug": "post-title",
    ...
    "views": 121  // Incremented on each request
  }
}
```

#### Update Post
```http
PUT /api/blog/[id]
Content-Type: application/json

{
  "title": "Updated Title",
  "published": true,
  ...
}
```

#### Delete Post
```http
DELETE /api/blog/[id]
```

## Admin Panel Usage

### Access Blog Management
1. Log in to `/admin/login`
2. Navigate to **Blog** in the sidebar
3. Manage blog posts

### Creating a New Post

1. Click **نیا پوسٹ (New Post)** button
2. Fill in the form:
   - **Title**: Post title (required)
   - **Slug**: URL-friendly identifier (required, must be unique)
   - **Excerpt**: Brief summary (required)
   - **Content**: Full post content with HTML support (required)
   - **Author**: Post author (defaults to "CPN (Maoist Center)")
   - **Category**: Choose category (News, Article, Press Release, Update)
   - **Image URL**: Featured image link (optional)
   - **Tags**: Comma-separated tags (optional)
   - **Featured**: Check to highlight post
   - **Published**: Check to publish immediately
3. Click **بنائیں (Create)** to save

### Editing a Post

1. Find the post in the list
2. Click the **Edit** (pencil icon) button
3. Modify the content
4. Click **اپڈیٹ کریں (Update)** to save

### Deleting a Post

1. Find the post in the list
2. Click the **Delete** (trash icon) button
3. Confirm deletion

### Publishing/Unpublishing

Click the **Status** button next to a post to toggle between:
- **ڈرافٹ (Draft)** - Visible in admin only
- **شائع (Published)** - Visible on public site

## Frontend Integration

### Blog Component
The `Blog` component fetches and displays featured posts on the homepage.

```tsx
// Automatically displays on home page
<Blog />

// Or view all posts at:
// /blog - Blog listing page
// /blog/[id] - Individual post page
```

### Nepali & Urdu Support
- All labels and buttons are bilingual (English/Nepali)
- Posts support HTML content for multilingual content
- Category labels are translated

## Examples

### Example 1: Create a News Article

```bash
curl -X POST http://localhost:3000/api/blog \
  -H "Content-Type: application/json" \
  -d '{
    "title": "अर्थनीति र समाजवाद",
    "slug": "arth-neeti-ra-samajwad",
    "excerpt": "CPN (Maoist Center) को आर्थिक नीति",
    "content": "<h2>आर्थिक नीति</h2><p>हामी बिश्वास गर्दछौ...</p>",
    "author": "CPN (Maoist Center)",
    "category": "article",
    "featured": true,
    "tags": ["economics", "policy", "socialism"],
    "published": true
  }'
```

### Example 2: Filter Posts by Category

```bash
# Get all news posts
curl "http://localhost:3000/api/blog?category=news"

# Get featured posts
curl "http://localhost:3000/api/blog?featured=true"

# Get news posts with pagination
curl "http://localhost:3000/api/blog?category=news&page=2&limit=5"
```

### Example 3: Update Post Status

```bash
# Publish a draft post
curl -X PUT http://localhost:3000/api/blog/[id] \
  -H "Content-Type: application/json" \
  -d '{"published": true}'
```

## Best Practices

### Content Creation
1. ✅ Use descriptive, SEO-friendly slugs
2. ✅ Keep excerpts under 200 characters
3. ✅ Use proper HTML formatting in content
4. ✅ Add relevant tags for organization
5. ✅ Include a featured image URL
6. ✅ Save as draft before publishing

### Category Usage
- **News**: Breaking news and announcements
- **Article**: Long-form opinion pieces and analysis
- **Press Release**: Official statements and declarations
- **Update**: Party updates and notifications

### Tagging Strategy
- Use lowercase tags
- Keep tags concise (1-3 words)
- Use consistent naming across posts
- Limit to 5-7 tags per post

## Technical Details

### Database Schema
Blog posts are stored in MongoDB with the following indexes:
- `slug` - Unique index for URL routes
- `published` - Index for quick filtering
- `category` - Index for category queries
- `createdAt` - Index for sorting by date

### View Counting
- View count is incremented automatically when a post is viewed
- One view is counted per request (no duplicate prevention)
- Data is updated in the database for accuracy

### URL Slug Rules
- Must be lowercase
- Must be unique across all posts
- Should be descriptive and URL-friendly
- Automatically slugified on creation

## Troubleshooting

### "Slug already exists"
- Choose a unique slug for your post
- Slugs must be unique across all blog posts
- Try adding a date or number to make it unique

### Posts not appearing on public site
- Check the **Published** status in admin panel
- Ensure publication date is not in the future
- Verify the post content is not empty

### View count not updating
- View count updates when the post is accessed
- Check browser console for fetch errors
- Verify MongoDB connection is working

## Content Security

The blog system supports HTML content, allowing for:
- Rich text formatting
- Embedded videos
- External links
- Images within content

**Security Note:** Always validate HTML content for security. The system accepts HTML as-is for maximum flexibility but should be used by trusted authors only.

## Deployment

For production deployment:

1. **Database**: Use MongoDB Atlas or managed database service
2. **Environment Variables**: Set `MONGODB_URI` to production database
3. **Security**: 
   - Change default admin credentials
   - Use strong `NEXTAUTH_SECRET`
   - Enable HTTPS
   - Implement rate limiting on API

4. **Performance**:
   - Use CDN for image hosting
   - Enable caching on blog pages
   - Consider static generation for popular posts

## Future Enhancements

Potential features for expansion:
- Comment system for posts
- Social media integration
- Email newsletters
- Advanced search with full-text indexing
- Related posts suggestions
- Reading time estimates
- Author profiles
- Post scheduling for future publication
- Markdown editor support
- Image upload to server

---

**Version**: 1.0  
**Last Updated**: November 30, 2025  
**Status**: ✅ Production Ready
