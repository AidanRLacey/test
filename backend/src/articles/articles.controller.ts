import { Controller, Post, Get, Body, Param, Patch } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { Article } from './schemas/article.schema';

@Controller('api')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post('articles')
  async createArticle(@Body() article: Article) {
    try {
      const newArticle = await this.articlesService.create(article);
      return { success: true, article: newArticle };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  // Get only non-rejected and non-accepted articles
  @Get('articles')
  async getAllArticles() {
    try {
      const articles = await this.articlesService.findAll();
      return { success: true, articles };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  // Get all articles (rejected, accepted, and pending)
  @Get('articles/all')
  async getAllArticlesForAdminSettings() {
    try {
      const articles = await this.articlesService.findAllArticles();
      return { success: true, articles };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  // Get accepted articles
  @Get('articles/accepted')
  async getAcceptedArticles() {
    try {
      const acceptedArticles = await this.articlesService.findAccepted();
      return { success: true, articles: acceptedArticles };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  // Get rejected articles
  @Get('articles/rejected')
  async getRejectedArticles() {
    try {
      const rejectedArticles = await this.articlesService.findRejected();
      return { success: true, articles: rejectedArticles };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  // Get approved articles
  @Get('articles/approved')
  async getApprovedArticles() {
    try {
      const approvedArticles = await this.articlesService.findApproved();
      return { success: true, articles: approvedArticles };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  // Reject an article
  @Patch('articles/:id/reject')
  async rejectArticle(@Param('id') id: string) {
    try {
      await this.articlesService.rejectArticle(id);
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  // Accept an article
  @Patch('articles/:id/accept')
  async acceptArticle(@Param('id') id: string) {
    try {
      await this.articlesService.acceptArticle(id);
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  // Edit an article
  @Patch('articles/:id/edit')
  async editArticle(
    @Param('id') id: string,
    @Body() updateData: Partial<Article>,
  ): Promise<any> {
    try {
      await this.articlesService.updateArticle(id, updateData);
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  // Add the approve route to mark articles as "approved"
  @Patch('articles/:id/approve')
  async approveArticle(@Param('id') id: string) {
    try {
      await this.articlesService.approveArticle(id);
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }
}
