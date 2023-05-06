<template>
     <div class="cart-item">
        <img class="cart-item__image" :src="item.media.source" />
        <div class="cart-item__details">
            <h4 class="cart-item__details-name">{{ item.productname }}</h4>
            <div class="cart-item__details-qty">
              <p>{{ item.quantity }}</p>
            </div>
            <p class="cart-item__details-price">{{ item.line_total.formatted_with_symbol }}</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'CartItem',
        props: ['item'],
        methods: {
            updateQuantity(quantity) {
                this.$emit('update-quantity', this.item.id, quantity);
            },
        }
        
    }
</script>